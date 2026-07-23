import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders/orders.service';

@Controller()
export class AppController {
  constructor(private readonly ordersService: OrdersService) {}

  @EventPattern('stock-reserved')
  async handleStockReserved(@Payload() data: any) {
    await this.ordersService.updateStatus(data.orderId, 'confirmed');
  }

  @EventPattern('stock-unavailable')
  async handleStockUnavailable(@Payload() data: any) {
    await this.ordersService.updateStatus(data.orderId, 'failed');
  }
}