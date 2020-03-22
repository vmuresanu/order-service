import { Controller, Get, Query, Post, Body, Param } from "@nestjs/common";
import { OrderRequest } from "./entity/order.request";
import { OrderService } from "./order.service";
import { OrderResponse } from "./entity/order.response";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }

  @Get() 
  async getOrders(): Promise<OrderResponse[]> {
    return this.orderService.getOrders();
  }

  @MessagePattern({ cmd: 'getOrdersByPeriod' })
  async getOrdersByPeriod(@Payload() period: string): Promise<OrderResponse[]> {

    return this.orderService.getOrdersByPeriod(period);
  }

  @Get('find/:id')
  @MessagePattern({ cmd: 'getOrders' })
  async getOrderById(@Payload() idTCP: string, @Param('id') id?: string): Promise<OrderResponse> {
    return this.orderService.getOrderById(id || idTCP);
  }

  @Post()
  async createOrder(@Body() orderRequest: OrderRequest): Promise<OrderResponse> {
    return await this.orderService.createOrder(orderRequest)
  }
}
