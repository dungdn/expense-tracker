import { Controller, Get, UseGuards } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'; // <--- Import ApiTags
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator'; // <--- Import Decorator

@ApiBearerAuth() // <--- 1. Báo cho Swagger biết API này cần Token
@UseGuards(JwtAuthGuard) // <--- 2. Gắn ổ khóa vào đây (Khóa toàn bộ Controller)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // API 1: Xem tổng chi tiêu
  // GET http://localhost:3000/reports/total
  @Get('total')
  getTotal(@GetUser() user: any) {
    return this.reportsService.getTotalSpending(user.userId);
  }

  // API 2: Xem chi tiêu theo danh mục
  // GET http://localhost:3000/reports/category
  @Get('category')
  getByCategory(@GetUser() user: any) {
    return this.reportsService.getSpendingByCategory(user.userId);
  }
}
