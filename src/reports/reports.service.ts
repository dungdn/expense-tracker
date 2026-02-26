import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../transactions/entities/transaction.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  // 1. Tính tổng chi tiêu (Tất cả thời gian)
  async getTotalSpending(userId: number) {
    const result = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'total')
      // Thêm điều kiện LỌC THEO USER
      .where('transaction.user_id = :userId', { userId }) 
      .getRawOne();

    return { total: parseFloat(result.total) || 0 };
  }

  // 2. Thống kê theo Danh mục (Ví dụ: Ăn uống hết bao nhiêu, Di chuyển hết bao nhiêu)
  async getSpendingByCategory(userId: number) {
    return await this.transactionsRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.category', 'category')
      .select('category.name', 'categoryName')
      .addSelect('SUM(transaction.amount)', 'totalAmount')
      // Thêm điều kiện LỌC THEO USER
      .where('transaction.user_id = :userId', { userId }) 
      .groupBy('category.name')
      .getRawMany();
  }
}