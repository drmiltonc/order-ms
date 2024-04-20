import { Controller, NotImplementedException, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationOrderDto } from './dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

 
   @MessagePattern('createOrder')
   createOrder(@Payload() createOrderDto: CreateOrderDto) {
     return this.ordersService.createOrder(createOrderDto);
   }

   @MessagePattern('findAllOrders')
   getAllOrders(@Payload() paginationOrderDto: PaginationOrderDto) {
     return this.ordersService.getAllOrders(paginationOrderDto);
   }

   @MessagePattern('findOneOrder')
   getOrderById(@Payload('id', ParseUUIDPipe) id: string) {
     return this.ordersService.getOrderById(id);
  }



/*   @MessagePattern('changeOrderStatus')
   changeOrderStatus(@Payload() updateOrderStatusDto: UpdateOrderStatusDto) {
     return this.ordersService.changeOrderStatus(updateOrderStatusDto);
  } */

  
}
