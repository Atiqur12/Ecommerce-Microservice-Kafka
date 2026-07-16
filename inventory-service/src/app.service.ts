import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './products/schema/shema';
import { ClientKafka } from '@nestjs/microservices';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Product.name) private productModel : Model<ProductDocument>,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka
  ) {}
  async processOrder(data: any) {
    const {orderId, productId, quantity, } = data
    const product = await this.productModel.findOne({productId})

    if(product && product.stock>=quantity){
      product.stock -= quantity
      await product.save()
      console.log(`stock reserved for order ${orderId}`)
      this.kafkaClient.emit('stock-reserved', {
        orderId, productId, quantity
      })
   
    }
    else{
      console.log('Sold out')
      this.kafkaClient.emit('stock-reserved', { 
        orderId, productId, quantity
      })

    }
   
  }
}