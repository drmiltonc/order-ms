import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { PaginationOrderDto } from './dto';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('OrdersService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database Connected')
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const order = await this.order.create({
      data: createOrderDto,
    });
    return order;
  }

  async getAllOrders(paginationOrderDto: PaginationOrderDto) {

    const totalPages = await this.order.count({
      where: {
        status: paginationOrderDto.status
      }
    });

    const currentPage = paginationOrderDto.page;

    const perPage = paginationOrderDto.limit;

    const orders = {
      data: await this.order.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where: {
          status: paginationOrderDto.status
        }
      }),
      meta: {
        total: totalPages,
        page: currentPage,
        lastPage: Math.ceil(totalPages / perPage)
      }

    };
    
    return orders;
  }

  async getOrderById(id: string) {
    const order = await this.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new RpcException({
        message: `Order with id ${id} not found`,
        status: HttpStatus.NOT_FOUND
      })
    }
    return order;
  }

  /* //generar una función para obtener todas las ordenes
  //devolverá un array de objetos de tipo Order
  

  

  //generar una función para cambiar el estado de una orden
  //recibirá un objeto de tipo UpdateOrderStatusDto
  //devolverá un objeto de tipo Order
  async changeOrderStatus(updateOrderStatusDto: UpdateOrderStatusDto) {
    const order = await this.order.update({
      where: { id: updateOrderStatusDto.id },
      data: { status: updateOrderStatusDto.status },
    });
    return order;
  } */

  /* remove(id: number) {
    return `This action removes a #${id} order`;
  } */

  //generar una función para crear un nueva orden
  /* create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  } */

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }


}
