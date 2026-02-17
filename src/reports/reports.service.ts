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
  async getTotalSpending() {
    // Sử dụng QueryBuilder để tính tổng cột 'amount'
    const result = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'total') // SELECT SUM(amount) AS total
      .getRawOne(); // Trả về kết quả thô (không qua Entity)

    // Nếu chưa có chi tiêu nào, trả về 0
    return { total: parseFloat(result.total) || 0 };
  }

  // 2. Thống kê theo Danh mục (Ví dụ: Ăn uống hết bao nhiêu, Di chuyển hết bao nhiêu)
  async getSpendingByCategory() {
    return await this.transactionsRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.category', 'category') // JOIN với bảng Category
      .select('category.name', 'categoryName')      // Lấy tên danh mục
      .addSelect('SUM(transaction.amount)', 'totalAmount') // Tính tổng tiền
      .groupBy('category.name')                     // Gom nhóm theo tên danh mục
      .getRawMany(); // Trả về danh sách kết quả thô
  }
}