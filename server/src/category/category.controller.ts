import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';

@ApiUseTags('category')
@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Get()
    async getAllOrders() {
        return this.categoryService.getAllCategories();
    }

    @Post('/new')
    async createNewUser(@Body() cate: CategoryDto) {
        return this.categoryService.creatNewCategory(cate);
    }
}
