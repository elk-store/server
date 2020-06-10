import {
  Controller,
  Get,
  Query,
  Param,
  UseGuards,
  Session,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { isEmpty } from 'class-validator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtPayload } from 'src/core/auth/auth.interface';
import { DeleteResult } from 'typeorm';

import { UserService } from '../user/user.service';
import { UserAddressCreateDTO } from './dto/user-address-create.dto';
import { UserAddressResponseDTO } from './dto/user-address-response.dto';
import { UserAddressSearchDTO } from './dto/user-address-search.dto';
import { UserAddress } from './user-address.entity';
import { UserAddressService } from './user-address.service';

@ApiTags('address')
@Controller('address')
export class UserAddressController {
  constructor(
    private addressService: UserAddressService,
    private userService: UserService
  ) {}

  @UseGuards(AuthGuard())
  @Post()
  public async create(
    @Session() user: JwtPayload,
    @Body() createDto: UserAddressCreateDTO
  ): Promise<UserAddressResponseDTO> {
    createDto.userEmail = user.email;
    const address = await this.addressService.create(createDto);
    return plainToClass(UserAddressResponseDTO, address);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  public delete(
    @Session() user: JwtPayload,
    @Param('id') id
  ): Promise<DeleteResult> {
    return this.addressService.delete(user.email, id);
  }

  @UseGuards(AuthGuard())
  @Get(':addressId')
  public async get(
    @Session() user: JwtPayload,
    @Param('addressId') id: string
  ): Promise<UserAddressResponseDTO> {
    const currentUser = await this.userService.findByEmail(user.email);

    const searchDto = new UserAddressSearchDTO();
    searchDto.addressId = id;
    searchDto.userId = currentUser.id;

    const address = await this.addressService.find(searchDto);
    return plainToClass(UserAddressResponseDTO, address);
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
  ): Promise<Pagination<UserAddressResponseDTO>> {
    const currentUser = await this.userService.findByEmail(user.email);

    const searchDto = new UserAddressSearchDTO();
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
          return plainToClass(UserAddressResponseDTO, item);
        })
      ),
      results.meta,
      results.links
    );
  }
}
