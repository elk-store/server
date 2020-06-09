import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Repository, SelectQueryBuilder, DeleteResult } from 'typeorm';

import { UserService } from '../user/user.service';
import { UserAddressCreateDTO } from './dto/user-address-create.dto';
import { UserAddressSearchDTO } from './dto/user-address-search.dto';
import { UserAddress } from './user-address.entity';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectRepository(UserAddress)
    private addressRepository: Repository<UserAddress>,
    private userService: UserService
  ) {}

  public async create(
    addressCreate: UserAddressCreateDTO
  ): Promise<UserAddress> {
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

  public async delete(
    userEmail: string,
    addressId: string
  ): Promise<DeleteResult> {
    const currentUser = await this.userService.findByEmail(userEmail);
    return this.addressRepository.delete({ id: addressId, user: currentUser });
  }

  public find(addressSearch: UserAddressSearchDTO): Promise<UserAddress> {
    return this.queryBuilder(addressSearch).getOne();
  }

  public paginate(
    addressSearch: UserAddressSearchDTO,
    options: IPaginationOptions
  ): Promise<Pagination<UserAddress>> {
    return paginate<UserAddress>(this.queryBuilder(addressSearch), options);
  }

  private queryBuilder(
    addressSearch: UserAddressSearchDTO
  ): SelectQueryBuilder<UserAddress> {
    const queryBuilder = this.addressRepository.createQueryBuilder('address');
    queryBuilder.where('address.id IS NOT NULL');

    if (
      addressSearch.addressId !== null &&
      addressSearch.addressId !== undefined
    ) {
      queryBuilder.andWhere('address.id = :addressId', {
        addressId: addressSearch.addressId,
      });
    }

    if (addressSearch.userId !== null && addressSearch.userId !== undefined) {
      queryBuilder.leftJoin('address.user', 'user');
      queryBuilder.andWhere('address.user.id = :userId', {
        userId: addressSearch.userId,
      });
    }

    if (addressSearch.cep !== null && addressSearch.cep !== undefined) {
      queryBuilder.andWhere('address.cep = :cep', { cep: addressSearch.cep });
    }

    if (addressSearch.city !== null && addressSearch.city !== undefined) {
      queryBuilder.andWhere('address.city ilike :city', {
        city: '%' + addressSearch.city + '%',
      });
    }

    if (
      addressSearch.district !== null &&
      addressSearch.district !== undefined
    ) {
      queryBuilder.andWhere('address.district ilike :district', {
        district: '%' + addressSearch.district + '%',
      });
    }

    if (addressSearch.number !== null && addressSearch.number !== undefined) {
      queryBuilder.andWhere('address.number = :number', {
        number: addressSearch.number,
      });
    }

    if (addressSearch.state !== null && addressSearch.state !== undefined) {
      queryBuilder.andWhere('address.state ilike :state', {
        state: '%' + addressSearch.state + '%',
      });
    }

    if (addressSearch.street !== null && addressSearch.street !== undefined) {
      queryBuilder.andWhere('address.street ilike :street', {
        street: '%' + addressSearch.street + '%',
      });
    }

    if (addressSearch.orders !== null && addressSearch.orders !== undefined) {
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
