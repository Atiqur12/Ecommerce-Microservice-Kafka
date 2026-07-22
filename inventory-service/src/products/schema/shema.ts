import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  
  @Prop({ required: true, unique: true, index: true })
  productId: string;

  @Prop({ required: true, type: Number })
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);