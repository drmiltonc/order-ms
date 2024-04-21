import { IsEnum, IsNumber, IsOptional, IsPositive, IsUUID, isEnum } from "class-validator";
import { OrderStatus } from "@prisma/client";
import { OrderStatusList } from "../enums/order.enum";

export class UpdateOrderStatusDto {

    @IsUUID(4)
    id: string;

    @IsEnum(OrderStatusList, { message: `Posible status value: ${OrderStatusList}` })
    status: OrderStatus;

}