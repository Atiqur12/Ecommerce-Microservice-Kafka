import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ProductsService } from './products/products.service';

@Injectable()
export class AppService {
  constructor(
    private productsService: ProductsService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka
  ) { }
  async processOrder(data: any) {
    const { orderId, productId, quantity, } = data
    const product = await this.productsService.reserveStock(productId, quantity)

    if (product) {

      console.log(`Stock reserved for order ${orderId}`);
      this.kafkaClient.emit('stock-reserved', {
        orderId, productId, quantity
      })
    }
    else {
      console.log('Sold out')
      this.kafkaClient.emit('stock-unavailable', {
        orderId, productId, quantity
      })




    }

  }


}