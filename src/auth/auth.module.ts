import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Import UsersModule
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, // Để dùng UsersService
    JwtModule.register({
      global: true, // Để dùng JWT ở mọi nơi
      secret: 'SECRET_KEY_NAY_PHAI_BAO_MAT', // Trong thực tế, cái này phải để trong file .env
      signOptions: { expiresIn: '1h' }, // Token hết hạn sau 1 giờ
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Đăng ký JwtStrategy để Passport có thể sử dụng
})
export class AuthModule {}