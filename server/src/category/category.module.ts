import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { UserAuthMiddleware } from '../auth/user.auth.middleware';
import { UserModule } from '../user/user.module';
import { AdminMiddleAuth } from '../auth/admin.auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), UserModule],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware, AdminMiddleAuth)
      .exclude({ path: 'category', method: RequestMethod.GET }) // new user
      .forRoutes(CategoryController);
  }
}
