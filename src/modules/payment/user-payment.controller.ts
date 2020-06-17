import {
  Body,
  Controller, Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { isEmpty } from 'class-validator';
import { Pagination } from 'nestjs-typeorm-paginate/index';
import { DeleteResult } from 'typeorm';

import { JwtPayload } from '../../core/auth/auth.interface';
import { UserService } from '../user/user.service';
import { UserPaymentCreateDTO } from './dto/user-payment-create.dto';
import { UserPaymentResponseDTO } from './dto/user-payment-response.dto';
import { UserPaymentSearchDTO } from './dto/user-payment-search.dto';
import { UserPayment } from './user-payment.entity';
import { UserPaymentService } from './user-payment.service';

@ApiTags('Payments')
@Controller('payment')
export class UserPaymentController {
  constructor(
    private paymentService: UserPaymentService,
    private userService: UserService
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a custom payment method to the logged user' })
  @ApiResponse({
    status: 201,
    type: UserPaymentResponseDTO,
  })
  @ApiBody({
    description: 'The UserPaymentCreateDTO object',
    type: UserPaymentCreateDTO,
    required: true,
  })
  @UseGuards(AuthGuard())
  @Post()
  public async create(
    @Session() user: JwtPayload,
    @Body() createDto: UserPaymentCreateDTO
  ) {
    createDto.userEmail = user.email;
    const payment = await this.paymentService.create(createDto);
    return plainToClass(UserPaymentResponseDTO, payment);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a custom address of the logged user',
  })
  @ApiResponse({
    status: 200,
    type: DeleteResult,
  })
  @UseGuards(AuthGuard())
  @ApiParam({ name: 'id', description: 'The payment method ID', required: true })
  @Delete(':id')
  public delete(
    @Session() user: JwtPayload,
    @Param('id') id
  ): Promise<DeleteResult> {
    return this.paymentService.delete(user.email, id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a payment method from the logged user' })
  @ApiResponse({
    status: 200,
    type: UserPaymentResponseDTO,
  })
  @ApiParam({
    name: 'id',
    description: 'The user payment id',
    required: true,
  })
  @UseGuards(AuthGuard())
  @Get(':id')
  public async find(
    @Session() user: JwtPayload,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    const loggedUser = await this.userService.findByEmail(user.email);

    const paymentSearch = new UserPaymentSearchDTO();
    paymentSearch.userId = loggedUser.id;
    paymentSearch.paymentId = id;

    const payment = await this.paymentService.find(paymentSearch);
    return plainToClass(UserPaymentResponseDTO, payment);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Get information about all created payment methods of the logged user',
  })
  @UseGuards(AuthGuard())
  @ApiQuery({
    name: 'cardName',
    description: 'Search by card name',
    required: false,
  })
  @ApiQuery({ name: 'order', description: 'Ordination', required: false })
  @ApiQuery({ name: 'page', description: 'Page start number', required: false })
  @ApiQuery({
    name: 'limit',
    description: 'Page limit number',
    required: false,
  })
  @Get()
  public async findAll(
    @Session() user: JwtPayload,
    @Query('cardName') cardName: string,
    @Query('order') order: string = null,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ) {
    const currentUser = await this.userService.findByEmail(user.email);

    const searchDto = new UserPaymentSearchDTO();
    searchDto.userId = currentUser.id;
    searchDto.cardName = cardName;

    if (!isEmpty(order)) {
      order = order.replace(' ', '');
      searchDto.orders = order.split(',');
    }

    const results = await this.paymentService.paginate(searchDto, {
      page,
      limit,
      route: '/address',
    });

    return new Pagination(
      await Promise.all(
        results.items.map(async (item: UserPayment) => {
          return plainToClass(UserPaymentResponseDTO, item);
        })
      ),
      results.meta,
      results.links
    );
  }
}
