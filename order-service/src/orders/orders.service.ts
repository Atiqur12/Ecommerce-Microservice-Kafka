import { Inject, NotFoundException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schema/schema'
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka
  ) { }
  async create(createOrderDto: CreateOrderDto) {
    const create =  new this.orderModel(createOrderDto)
    const saved = await create.save()
    this.kafkaClient.emit('order-created', {
    orderId : saved._id,
    productId : saved.productId,
    quantity : saved.quantity
    })
    console.log('Kafka message details', saved._id, saved.productId, saved.quantity);
    return saved;
  }

  async findAll() {
    return this.orderModel.find().exec()
  }

  async findOne(id: string) {
    const exist = await this.orderModel.findById(id).exec()
    if (!exist) {
      throw new NotFoundException("record not found")
    }
    return exist;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const exist = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec()

    if (!exist) {
      throw new NotFoundException("record not found")
    }
    return exist;
  }

  async updateStatus(orderId: string, status: string) {
    return this.orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
  }

  async remove(id: string) {
    const exist = await this.orderModel.findByIdAndDelete(id).exec()

    if (!exist) {
      throw new NotFoundException("record not found to be deleted")
    }
    return exist;
  }
}
