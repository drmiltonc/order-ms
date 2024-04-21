import { HttpStatus, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from '@prisma/client';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationOrderDto, UpdateOrderStatusDto } from './dto';
import { PRODUCTS_SERVICE } from 'src/common/config/services';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('OrdersService');

  constructor(@Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy) {
    super();
  }


  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  async create(createOrderDto: CreateOrderDto) {

    const ids = [20, 21];

    const products = await firstValueFrom(this.productsClient.send({cdm: 'validate_products'}, ids));

    return products;

  }

  async findAll(orderPaginationDto: PaginationOrderDto) {

    const totalPages = await this.order.count({
      where: {
        status: orderPaginationDto.status
      }
    });

    const currentPage = orderPaginationDto.page;
    const perPage = orderPaginationDto.limit;


    return {
      data: await this.order.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where: {
          status: orderPaginationDto.status
        }
      }),
      meta: {
        total: totalPages,
        page: currentPage,
        lastPage: Math.ceil(totalPages / perPage)
      }
    }
  }


  async findOne(id: string) {

    const order = await this.order.findFirst({
      where: { id }
    });

    if (!order) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Order with id ${id} not found`
      });
    }

    return order;

  }

  async changeStatus(changeOrderStatusDto: UpdateOrderStatusDto) {

    const { id, status } = changeOrderStatusDto;

    const order = await this.findOne(id);
    if (order.status === status) {
      return order;
    }

    return this.order.update({
      where: { id },
      data: { status: status }
    });


  }



}