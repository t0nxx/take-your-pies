import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository, TreeRepository } from 'typeorm';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: TreeRepository<Category>,
    ) { }

    async getAllCategories(): Promise<any> {
        const data = await this.categoryRepository.findTrees();
        return { data };
    }

    async creatNewCategory(cate: CategoryDto): Promise<Category> {
        const parent = await this.categoryRepository.findOne(cate.parentId);

        const savedCate = await this.categoryRepository.create(cate);
        savedCate.parent = parent;

        await this.categoryRepository.save(savedCate);
        return savedCate;
    }

    
}
