import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    productId: string;
  
    @IsInt()
    @Min(0)
    stock: number;
}
