import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

@EventPattern('order-created')
async handleOrderCreated(@Payload() data : any){
  await this.appService.processOrder(data);
}
}
