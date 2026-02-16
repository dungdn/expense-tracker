import { IsNotEmpty, IsNumber, IsPositive, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive() // Số tiền phải lớn hơn 0
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number; // Người dùng sẽ gửi ID của danh mục (VD: 1, 2)

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsDateString() // Kiểm tra định dạng ngày tháng (ISO 8601)
  date?: string;
}