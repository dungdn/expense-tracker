import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity'; // Import Entity

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Đăng ký
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Xuất Service ra để AuthModule dùng sau này
})
export class UsersModule {}
