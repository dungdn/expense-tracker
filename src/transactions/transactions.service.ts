import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Category } from '../categories/category.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,

    // Inject thêm Repository của Category để kiểm tra tồn tại
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, userId: number) {
    const { categoryId, ...transactionData } = createTransactionDto;

    // 1. Kiểm tra Category có tồn tại VÀ có thuộc về user này không
    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId, user: { id: userId } },
    });

    if (!category) {
      throw new NotFoundException(
        `Danh mục không tồn tại hoặc bạn không có quyền!`,
      );
    }

    // 2. Tạo Transaction mới và gắn chủ sở hữu
    const newTransaction = this.transactionsRepository.create({
      ...transactionData,
      category: category,
      user: { id: userId }, // Đóng dấu chủ sở hữu
    });

    return await this.transactionsRepository.save(newTransaction);
  }

  async findAll(userId: number) {
    return await this.transactionsRepository.find({
      where: { user: { id: userId } }, // Lọc theo user
      relations: ['category'],
      order: { date: 'DESC' }
    });
  }

  async findOne(id: number, userId: number) {
    const transaction = await this.transactionsRepository.findOne({
      where: { id, user: { id: userId } }, // Check quyền
      relations: ['category'],
    });
    if (!transaction)
      throw new NotFoundException(
        "Giao dịch không tồn tại hoặc không có quyền",
      );
    return transaction;
  }

  async update(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
    userId: number,
  ) {
    await this.findOne(id, userId); // Check quyền trước

    // Nếu họ muốn đổi Category, phải check lại Category mới
    if (updateTransactionDto.categoryId) {
      const category = await this.categoriesRepository.findOne({
        where: { id: updateTransactionDto.categoryId, user: { id: userId } }
      });
      if (!category) throw new NotFoundException('Danh mục mới không hợp lệ');

      const { categoryId, ...data } = updateTransactionDto;
      await this.transactionsRepository.update(id, { ...data, category });
    } else {
      await this.transactionsRepository.update(id, updateTransactionDto);
    }

    return this.findOne(id, userId);
  }

  // 5. Xóa
  async remove(id: number, userId: number) {
    await this.findOne(id, userId); // Check quyền trước
    await this.transactionsRepository.delete(id);
  }
}