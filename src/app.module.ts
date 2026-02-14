import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    // 1. Cấu hình để đọc file .env
    ConfigModule.forRoot({
      isGlobal: true, // Để các module khác cũng dùng được biến môi trường
    }),
    // 2. Cấu hình kết nối Database
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [], // Chúng ta sẽ thêm các bảng (Entity) vào đây sau
      synchronize: true, // LƯU Ý: Chỉ dùng true khi dev (tự động tạo bảng), production phải để false
    }),
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
