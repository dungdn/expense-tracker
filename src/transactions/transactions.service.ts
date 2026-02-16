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

  async create(createTransactionDto: CreateTransactionDto) {
    const { categoryId, ...transactionData } = createTransactionDto;

    // 1. Kiểm tra Category có tồn tại không?
    const category = await this.categoriesRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException(`Không tìm thấy danh mục có ID = ${categoryId}`);
    }

    // 2. Tạo Transaction mới và gán Category vào
    const newTransaction = this.transactionsRepository.create({
      ...transactionData,
      category: category, // TypeORM sẽ tự lấy ID để lưu vào cột category_id
    });

    return await this.transactionsRepository.save(newTransaction);
  }

  async findAll() {
    // relations: ['category'] giúp lấy luôn thông tin danh mục kèm theo
    return await this.transactionsRepository.find({
      relations: ['category'], 
      order: { date: 'DESC' } // Sắp xếp mới nhất lên đầu
    });
  }

  async findOne(id: number) {
    const transaction = await this.transactionsRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!transaction) throw new NotFoundException('Giao dịch không tồn tại');
    return transaction;
  }
  
  // 4. Cập nhật (Sửa)
  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    // Logic update ở đây
    await this.transactionsRepository.update(id, updateTransactionDto);
    return this.findOne(id);
    // return `This action updates a #${id} transaction`;
  }

  // 5. Xóa
  async remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}