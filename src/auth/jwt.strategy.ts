import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. Lấy token từ Header "Authorization: Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // 2. Không bỏ qua việc kiểm tra hết hạn (Token hết hạn là chặn luôn)
      ignoreExpiration: false,

      // 3. Khóa bí mật (PHẢI GIỐNG VỚI KHÓA TRONG AUTH MODULE)
      secretOrKey: 'SECRET_KEY_NAY_PHAI_BAO_MAT', 
    });
  }

  // Hàm này chạy sau khi Token đã được xác thực chữ ký thành công
  async validate(payload: any) {
    // Trả về object này, nó sẽ được gắn vào req.user
    return { userId: payload.sub, email: payload.email };
  }
}
