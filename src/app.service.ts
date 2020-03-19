import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getOrders(): any[] {
    const orders = [
      {orderId: '1', spotDate: '12/02/2019'},
      {orderId: '2', spotDate: '12/04/2020'},
    ]
    return orders;
  }
}
