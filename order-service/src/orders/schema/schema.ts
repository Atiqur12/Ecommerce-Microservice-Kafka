import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type OrderDocument = Order & Document  

@Schema({timestamps: true})

export class Order {

    @Prop({required : true, type: String})
    productId

    @Prop({required : true, type: Number})
    quantity

    @Prop({required : true, type: String})
    customerEmail

    @Prop({ required: true, type: String, default: 'pending', enum: ['pending', 'confirmed', 'failed'] })
    status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order)