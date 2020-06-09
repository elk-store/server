import { Controller, Get, Query, Param } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { Pagination } from 'nestjs-typeorm-paginate';

import { AddressService } from './address.service';
import { AddressSearchDTO } from './dto/addressSearch.dto';
import { UserAddress } from './user-address.entity';

@Controller('address')
export class AddressContoller {
  constructor(private addressService: AddressService) {}

  @Get(':addressId')
  public async get(@Param('addressId') id): Promise<UserAddress> {
    const searchDto = new AddressSearchDTO();
    searchDto.addressId = id;
    return this.addressService.find(searchDto);
  }

  @Get()
  public async index(
    @Query('userId') userId: string = null,
    @Query('street') street: string = null,
    @Query('number') number = null,
    @Query('cep') cep = null,
    @Query('city') city: string = null,
    @Query('district') district: string = null,
    @Query('state') state: string = null,
    @Query('order') order: string = null,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<Pagination<UserAddress>> {
    const searchDto = new AddressSearchDTO();
    searchDto.userId = userId;
    searchDto.street = street;
    searchDto.number = number;
    searchDto.cep = cep;
    searchDto.city = city;
    searchDto.district = district;
    searchDto.state = state;

    if (!isEmpty(order)) {
      searchDto.orders = order.split(',');
    }

    return this.addressService.paginate(searchDto, {
      page,
      limit,
      route: '/address',
    });
  }
}
