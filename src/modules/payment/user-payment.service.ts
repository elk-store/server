import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate/index';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';

import { UserService } from '../user/user.service';
import { UserPaymentCreateDTO } from './dto/user-payment-create.dto';
import { UserPaymentSearchDTO } from './dto/user-payment-search.dto';
import { UserPayment } from './user-payment.entity';

@Injectable()
export class UserPaymentService {
  constructor(
    @InjectRepository(UserPayment)
    private paymentRepository: Repository<UserPayment>,
    private userService: UserService
  ) {}

  public async create(
    paymentCreate: UserPaymentCreateDTO
  ): Promise<UserPayment> {
    const user = await this.userService.findByEmail(paymentCreate.userEmail);
    const payment = new UserPayment();

    payment.name = paymentCreate.name;
    payment.cardNumber = paymentCreate.cardNumber;
    payment.expireAt = paymentCreate.expireAt;
    payment.user = user;

    return this.paymentRepository.save(payment);
  }

  public async delete(
    userEmail: string,
    paymentId: string
  ): Promise<DeleteResult> {
    const currentUser = await this.userService.findByEmail(userEmail);
    return this.paymentRepository.delete({ id: paymentId, user: currentUser });
  }

  public find(paymentSearch: UserPaymentSearchDTO): Promise<UserPayment> {
    return this.queryBuilder(paymentSearch).getOne();
  }

  public paginate(
    paymentSearch: UserPaymentSearchDTO,
    options: IPaginationOptions
  ): Promise<Pagination<UserPayment>> {
    return paginate<UserPayment>(this.queryBuilder(paymentSearch), options);
  }

  private queryBuilder(
    paymentSearch: UserPaymentSearchDTO
  ): SelectQueryBuilder<UserPayment> {
    const queryBuilder = this.paymentRepository.createQueryBuilder('payment');
    queryBuilder.where('payment.id IS NOT NULL');

    if (
      paymentSearch.paymentId !== null &&
      paymentSearch.paymentId !== undefined
    ) {
      queryBuilder.andWhere('payment.id = :paymentId', {
        paymentId: paymentSearch.paymentId,
      });
    }

    if (paymentSearch.userId !== null && paymentSearch.userId !== undefined) {
      queryBuilder.andWhere('payment.user.id = :userId', {
        userId: paymentSearch.userId,
      });
    }

    if (
      paymentSearch.cardName !== null &&
      paymentSearch.cardName !== undefined
    ) {
      queryBuilder.andWhere('payment.name = :cardName', {
        cardName: '%' + paymentSearch.cardName + '%',
      });
    }

    if (paymentSearch.orders !== null && paymentSearch.orders !== undefined) {
      paymentSearch.orders.forEach(order => {
        if (order.startsWith('-')) {
          order = order.replace('-', '');
          queryBuilder.addOrderBy('payment.' + order, 'DESC');
        } else {
          queryBuilder.addOrderBy('payment.' + order, 'ASC');
        }
      });
    }

    return queryBuilder;
  }
}
