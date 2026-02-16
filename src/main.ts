import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common"; // <--- Import này

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Kích hoạt Validation cho toàn bộ ứng dụng
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
