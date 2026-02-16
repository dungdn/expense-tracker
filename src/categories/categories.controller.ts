import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./create-category.dto";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // POST /categories
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  // GET /categories
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  // GET /categories/1
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { 
    // ParseIntPipe giúp chuyển "1" (string) thành 1 (number)
    return this.categoriesService.findOne(id);
  }

  // PATCH /categories/1
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<CreateCategoryDto>) {
    return this.categoriesService.update(id, updateData);
  }

  // DELETE /categories/1
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}