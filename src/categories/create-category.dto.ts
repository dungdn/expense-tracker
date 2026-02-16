import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty() // Bắt buộc phải có
  @IsString()   // Phải là chuỗi
  name: string;

  @IsOptional() // Không bắt buộc
  @IsString()
  description?: string;
}
