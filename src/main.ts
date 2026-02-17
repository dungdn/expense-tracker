import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common"; // <--- Import này
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // <--- 1. Import Swagger

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Kích hoạt Validation cho toàn bộ ứng dụng
  app.useGlobalPipes(new ValidationPipe());

  // --- 2. Cấu hình Swagger ---
  const config = new DocumentBuilder()
    .setTitle('Expense Tracker API') // Tiêu đề
    .setDescription('API quản lý chi tiêu cá nhân') // Mô tả
    .setVersion('1.0') // Phiên bản
    .addTag('Categories') // Các nhóm API (tùy chọn)
    .addTag('Transactions')
    .addTag('Reports')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Đường dẫn sẽ là /api
  // ---------------------------

  await app.listen(3000);
}
bootstrap();
