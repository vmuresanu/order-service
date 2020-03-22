import { Repository, EntityRepository } from "typeorm";
import { Order } from "./entity/order.entity";

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
}