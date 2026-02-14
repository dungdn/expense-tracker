import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <--- Import này
import { CategoriesController } from './categories.controller';
import { CategoriesService } from "./categories.service";
import { Category } from "./category.entity"; // <--- Import Entity vừa tạo

@Module({
  imports: [TypeOrmModule.forFeature([Category])], // <--- Đăng ký Entity ở đây
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
