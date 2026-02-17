import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <--- Import
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Transaction } from '../transactions/entities/transaction.entity'; // <--- Import Entity

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])], // <--- Đăng ký Entity Transaction
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}