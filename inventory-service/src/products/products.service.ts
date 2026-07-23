import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product , ProductDocument} from './schema/shema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor( 
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  )  {}
  async create(createProductDto: CreateProductDto) {
    const create = new this.productModel(createProductDto)
    const save = await create.save()
    return save;
  }

 async findAll() {
    return this.productModel.find().exec();
  }
  
  async reserveStock(productId: string, quantity: number) {
    return this.productModel.findOneAndUpdate(
      {
        productId,
        stock: { $gte: quantity },
      },
      {
        $inc: { stock: -quantity },
      },
      {
        new: true,
      },
    );
  }
  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
  
  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
  
  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
}
}
