import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'; // Thêm ApiBearerAuth
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import Guard
import { GetUser } from '../auth/get-user.decorator'; // Import Decorator

@ApiBearerAuth() // <--- 1. Báo cho Swagger biết API này cần Token
@UseGuards(JwtAuthGuard) // <--- 2. Gắn ổ khóa vào đây (Khóa toàn bộ Controller)
@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @GetUser() user: any) {
    return this.transactionsService.create(createTransactionDto, user.userId);
  }

  @Get()
  findAll(@GetUser() user: any) {
    return this.transactionsService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: any) {
    return this.transactionsService.findOne(id, user.userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @GetUser() user: any
  ) {
    return this.transactionsService.update(id, updateTransactionDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: any) {
    return this.transactionsService.remove(id, user.userId);
  }
}
