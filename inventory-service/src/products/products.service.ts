import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
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

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
