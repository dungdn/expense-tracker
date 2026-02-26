import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  // 1. TẠO: Gắn thêm chủ sở hữu
  async create(createCategoryDto: CreateCategoryDto, userId: number): Promise<Category> {
    const newCategory = this.categoriesRepository.create({
      ...createCategoryDto,
      user: { id: userId }, // Đóng dấu chủ sở hữu
    });
    return await this.categoriesRepository.save(newCategory);
  }

  // 2. XEM TẤT CẢ: Chỉ lấy của user này
  async findAll(userId: number): Promise<Category[]> {
    return await this.categoriesRepository.find({
      where: { user: { id: userId } }, // Lọc theo user_id
    });
  }

  // 3. XEM CHI TIẾT: Phải đúng ID danh mục VÀ đúng chủ sở hữu
  async findOne(id: number, userId: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!category) {
      throw new NotFoundException(`Không tìm thấy danh mục hoặc bạn không có quyền truy cập`);
    }
    return category;
  }

  // 4. CẬP NHẬT: Phải check quyền trước khi sửa
  async update(id: number, updateData: Partial<CreateCategoryDto>, userId: number): Promise<Category> {
    // Gọi hàm findOne để kiểm tra xem danh mục có tồn tại VÀ có thuộc về user này không
    await this.findOne(id, userId);

    // Nếu qua được bước trên (không bị throw error), tiến hành update
    await this.categoriesRepository.update(id, updateData);

    // Trả về kết quả mới nhất
    return this.findOne(id, userId);
  }

  // 5. XÓA: Phải check quyền trước khi xóa
  async remove(id: number, userId: number): Promise<void> {
    // Kiểm tra quyền sở hữu
    await this.findOne(id, userId);

    // Xóa khỏi database
    await this.categoriesRepository.delete(id);
  }
}
