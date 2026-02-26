import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    // 1. Tìm user theo email
    const user = await this.usersService.findOneByEmail(loginDto.email);

    // 2. Nếu không có user -> Lỗi
    if (!user) {
      throw new UnauthorizedException('Email không tồn tại');
    }

    // 3. So sánh password (Pass nhập vào vs Pass đã mã hóa trong DB)
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Mật khẩu không đúng');
    }

    // 4. Tạo Token (Payload là thông tin muốn lưu trong token)
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
