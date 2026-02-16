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

  // 1. Tạo (Đã làm)
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoriesRepository.create(createCategoryDto);
    return await this.categoriesRepository.save(newCategory);
  }

  // 2. Xem tất cả
  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  // 3. Xem một cái theo ID
  async findOne(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Không tìm thấy danh mục có ID = ${id}`);
    }
    return category;
  }

  // 4. Cập nhật (Sửa)
  async update(id: number, updateData: Partial<CreateCategoryDto>): Promise<Category> {
    await this.categoriesRepository.update(id, updateData);
    return this.findOne(id); // Trả về kết quả sau khi update
  }

  // 5. Xóa
  async remove(id: number): Promise<void> {
    await this.findOne(id); // Kiểm tra xem có tồn tại không trước khi xóa
    await this.categoriesRepository.delete(id);
  }
}