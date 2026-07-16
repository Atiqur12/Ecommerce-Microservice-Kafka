import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { EventEmitter } from 'stream';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @EventPattern('stock-reserved')
  async handleStockReserved(@Payload() data :any){
    await this.appService.notifySuccess(data)

  }
  @EventPattern('stock-unavailable')
  async handleStockUnavailable(@Payload() data : any){
    await this.appService.notifyFailure(data)
  }

}
