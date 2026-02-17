import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // API 1: Xem tổng chi tiêu
  // GET http://localhost:3000/reports/total
  @Get('total')
  getTotal() {
    return this.reportsService.getTotalSpending();
  }

  // API 2: Xem chi tiêu theo danh mục
  // GET http://localhost:3000/reports/category
  @Get('category')
  getByCategory() {
    return this.reportsService.getSpendingByCategory();
  }
}