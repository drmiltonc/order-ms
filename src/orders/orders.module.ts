import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCTS_SERVICE } from 'src/common/config/services';
import envVars from 'src/common/config/envs';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envVars.PRODUCTS_MICROSERVICE_HOST,
          port: envVars.PRODUCTS_MICROSERVICE_PORT

        }
      }
    ])
  ]
})
export class OrdersModule {}
