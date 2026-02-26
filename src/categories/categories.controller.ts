import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./create-category.dto";
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'; // <--- Import ApiTags
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator'; // <--- Import Decorator

@ApiTags('Categories') // <--- Gắn thẻ để gom nhóm trong giao diện Swagger
@ApiBearerAuth() // <--- 1. Báo cho Swagger biết API này cần Token
@UseGuards(JwtAuthGuard) // <--- 2. Gắn ổ khóa vào đây (Khóa toàn bộ Controller)
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // POST /categories
  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser() user: any, // <--- 2. Lấy thông tin user
  ) {
    // Truyền userId xuống Service
    return this.categoriesService.create(createCategoryDto, user.userId);
  }

  // GET /categories
  @Get()
  findAll(@GetUser() user: any) { // <--- Lấy thông tin user
    return this.categoriesService.findAll(user.userId);
  }

  // GET /categories/1
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: any) {
    return this.categoriesService.findOne(id, user.userId);
  }

  // PATCH /categories/1
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<CreateCategoryDto>, @GetUser() user: any) {
    return this.categoriesService.update(id, updateData, user.userId);
  }

  // DELETE /categories/1
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: any) {
    return this.categoriesService.remove(id, user.userId);
  }
}