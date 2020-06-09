import {
  Controller,
  Get,
  Query,
  Param,
  UseGuards,
  Session,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { isEmpty } from 'class-validator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtPayload } from 'src/core/auth/auth.interface';

import { UserService } from '../user/user.service';
import { AddressService } from './address.service';
import { AddressResponseDTO } from './dto/addressResponse.dto';
import { AddressSearchDTO } from './dto/addressSearch.dto';
import { UserAddress } from './user-address.entity';

@Controller('address')
export class AddressContoller {
  constructor(
    private addressService: AddressService,
    private userService: UserService
  ) {}

  @UseGuards(AuthGuard())
  @Get(':addressId')
  public async get(
    @Session() user: JwtPayload,
    @Param('addressId') id: string
  ): Promise<AddressResponseDTO> {
    const currentUser = await this.userService.findByEmail(user.email);

    const searchDto = new AddressSearchDTO();
    searchDto.addressId = id;
    searchDto.userId = currentUser.id;

    const address = await this.addressService.find(searchDto);
    return plainToClass(AddressResponseDTO, address);
  }

  @UseGuards(AuthGuard())
  @Get()
  public async index(
    @Session() user: JwtPayload,
    @Query('street') street: string = null,
    @Query('number') number = null,
    @Query('cep') cep = null,
    @Query('city') city: string = null,
    @Query('district') district: string = null,
    @Query('state') state: string = null,
    @Query('order') order: string = null,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<Pagination<AddressResponseDTO>> {
    const currentUser = await this.userService.findByEmail(user.email);

    const searchDto = new AddressSearchDTO();
    searchDto.userId = currentUser.id;
    searchDto.street = street;
    searchDto.number = number;
    searchDto.cep = cep;
    searchDto.city = city;
    searchDto.district = district;
    searchDto.state = state;

    if (!isEmpty(order)) {
      order = order.replace(' ', '');
      searchDto.orders = order.split(',');
    }

    const results = await this.addressService.paginate(searchDto, {
      page,
      limit,
      route: '/address',
    });

    return new Pagination(
      await Promise.all(
        results.items.map(async (item: UserAddress) => {
          return plainToClass(AddressResponseDTO, item);
        })
      ),
      results.meta,
      results.links
    );
  }
}
