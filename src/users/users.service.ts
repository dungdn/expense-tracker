import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'; // Import thư viện mã hóa

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    // 1. Kiểm tra xem email đã tồn tại chưa
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email này đã được sử dụng!');
    }

    // 2. Mã hóa mật khẩu (Hashing)
    const salt = await bcrypt.genSalt(); // Tạo chuỗi ngẫu nhiên
    const hashedPassword = await bcrypt.hash(password, salt); // Băm mật khẩu

    // 3. Lưu vào Database
    const user = this.usersRepository.create({
      email,
      password: hashedPassword, // Lưu mật khẩu đã mã hóa
    });

    return await this.usersRepository.save(user);
  }

  // Hàm này sẽ dùng cho chức năng Đăng nhập sau này
  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
