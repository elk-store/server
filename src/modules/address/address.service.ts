import { isNullOrUndefined } from 'util';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { UserService } from '../user/user.service';
import { AddressCreateDTO } from './dto/addressCreate.dto';
import { AddressSearchDTO } from './dto/addressSearch.dto';
import { UserAddress } from './user-address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(UserAddress)
    private addressRepository: Repository<UserAddress>,
    private userService: UserService
  ) {}

  public async create(addressCreate: AddressCreateDTO): Promise<UserAddress> {
    const user = await this.userService.findByEmail(addressCreate.userEmail);
    const address = new UserAddress();

    address.cep = addressCreate.cep;
    address.city = addressCreate.city;
    address.district = addressCreate.district;
    address.name = addressCreate.name;
    address.number = addressCreate.number;
    address.state = addressCreate.state;
    address.street = addressCreate.street;
    address.user = user;

    return this.addressRepository.save(address);
  }

  public find(addressSearch: AddressSearchDTO): Promise<UserAddress> {
    return this.queryBuilder(addressSearch).getOne();
  }

  public paginate(
    addressSearch: AddressSearchDTO,
    options: IPaginationOptions
  ): Promise<Pagination<UserAddress>> {
    return paginate<UserAddress>(this.queryBuilder(addressSearch), options);
  }

  private queryBuilder(
    addressSearch: AddressSearchDTO
  ): SelectQueryBuilder<UserAddress> {
    const queryBuilder = this.addressRepository.createQueryBuilder('address');
    queryBuilder.where('address.id IS NOT NULL');

    if (!isNullOrUndefined(addressSearch.addressId)) {
      queryBuilder.andWhere('address.id = :addressId', {
        addressId: addressSearch.addressId,
      });
    }

    if (!isNullOrUndefined(addressSearch.userId)) {
      queryBuilder.leftJoin('address.user', 'user');
      queryBuilder.andWhere('address.user.id = :userId', {
        userId: addressSearch.userId,
      });
    }

    if (!isNullOrUndefined(addressSearch.cep)) {
      queryBuilder.andWhere('address.cep = :cep', { cep: addressSearch.cep });
    }

    if (!isNullOrUndefined(addressSearch.city)) {
      queryBuilder.andWhere('address.city like %:city%', {
        city: addressSearch.city,
      });
    }

    if (!isNullOrUndefined(addressSearch.district)) {
      queryBuilder.andWhere('address.district like %:district%', {
        district: addressSearch.district,
      });
    }

    if (!isNullOrUndefined(addressSearch.number)) {
      queryBuilder.andWhere('address.number = :number', {
        number: addressSearch.number,
      });
    }

    if (!isNullOrUndefined(addressSearch.state)) {
      queryBuilder.andWhere('address.state like %:state%', {
        state: addressSearch.state,
      });
    }

    if (!isNullOrUndefined(addressSearch.street)) {
      queryBuilder.andWhere('address.street like %:street%', {
        street: addressSearch.street,
      });
    }

    if (!isNullOrUndefined(addressSearch.orders)) {
      addressSearch.orders.forEach(order => {
        if (order.startsWith('-')) {
          order = order.replace('-', '');
          queryBuilder.addOrderBy('address.' + order, 'DESC');
        } else {
          queryBuilder.addOrderBy('address.' + order, 'ASC');
        }
      });
    }

    return queryBuilder;
  }
}
