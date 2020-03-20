import { Injectable } from "@nestjs/common";
import { Order } from "./entity/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderRequest } from "./entity/order.request";
import { OrderResponse } from "./entity/order.response";
import { plainToClass } from "class-transformer";
import { OrderRepository } from "./order.repository";
import { Between } from "typeorm";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: OrderRepository
  ) {
  }

  async getOrders(): Promise<OrderResponse[]> {
    return this.orderRepository
      .find()
      .then((orders: Order[]) => {
        return plainToClass(OrderResponse, orders);
      })
  }

  async getOrdersByPeriod(period: string): Promise<OrderResponse[]> {
    let periodFromTo = period.split(',');
    // TODO: Verify period
    return this.orderRepository
      .createQueryBuilder('o')
      .where('o.startDate > :periodFrom', { periodFrom: periodFromTo[0] })
      .andWhere('o.endDate < :periodTo', { periodTo: periodFromTo[1] })
      .getMany()
      .then((orders: Order[]) => {
        return plainToClass(OrderResponse, orders);
      })
  }

  async getOrderById(id: string): Promise<OrderResponse> {
    return this.orderRepository
      .findOne({ where: { uuid: id } })
      .then((order: Order) => {
        return plainToClass(OrderResponse, order);
      });
  }

  async createOrder(orderRequest: OrderRequest): Promise<OrderResponse> {
    const order = this.orderRepository.create(orderRequest);
    return this.orderRepository
      .save(order)
      .then((order: Order) => {
        return plainToClass(OrderResponse, order)
      });
  }
}