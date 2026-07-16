import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
 async notifySuccess(data : any){
  console.log(` Order ${data.orderId} confirmed — stock reserved for ${data.productId}`);
 }
 async notifyFailure(data: any) {
  console.log(` Order ${data.orderId} failed — out of stock for ${data.productId}`);
}
}
