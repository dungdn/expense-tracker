import { IsNotEmpty, IsNumber, IsPositive, IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ example: 50000, description: "Số tiền chi tiêu" })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive() // Số tiền phải lớn hơn 0
  amount: number;

  @ApiProperty({ example: 1, description: 'ID của danh mục' })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number; // Người dùng sẽ gửi ID của danh mục (VD: 1, 2)

  @ApiProperty({ example: 'Ăn phở', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ example: '2023-10-27T08:30:00Z', required: false })
  @IsOptional()
  @IsDateString() // Kiểm tra định dạng ngày tháng (ISO 8601)
  date?: string;
}