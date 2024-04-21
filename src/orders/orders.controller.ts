import { Controller, NotImplementedException, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationOrderDto, UpdateOrderStatusDto } from './dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

 
   @MessagePattern('createOrder')
   createOrder(@Payload() createOrderDto: CreateOrderDto) {
     return this.ordersService.create(createOrderDto);
   }

   @MessagePattern('findAllOrders')
   getAllOrders(@Payload() paginationOrderDto: PaginationOrderDto) {
     return this.ordersService.findAll(paginationOrderDto);
   }

   @MessagePattern('findOneOrder')
   getOrderById(@Payload('id', ParseUUIDPipe) id: string) {
     return this.ordersService.findOne(id);
  }


 @MessagePattern('changeOrderStatus')
   changeOrderStatus(@Payload() updateOrderStatusDto: UpdateOrderStatusDto) {
     return this.ordersService.changeStatus(updateOrderStatusDto);
  }

  
}

