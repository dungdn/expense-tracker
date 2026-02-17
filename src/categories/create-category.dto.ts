import { IsNotEmpty, IsString, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'; // <--- Import

export class CreateCategoryDto {
  @ApiProperty({ example: "Ăn uống", description: "Tên danh mục" }) // <--- Thêm dòng này
  @IsNotEmpty() // Bắt buộc phải có
  @IsString()   // Phải là chuỗi
  name: string;

  @ApiProperty({ example: 'Chi tiêu hằng ngày', required: false }) // <--- Thêm dòng này
  @IsOptional() // Không bắt buộc
  @IsString()
  description?: string;
}
