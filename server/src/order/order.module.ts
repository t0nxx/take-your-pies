import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthMiddleware } from '../auth/user.auth.middleware';
import { UserModule } from '../user/user.module';
import { OrderItems } from './oderItems.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItems]), UserModule], /* imported the module for using it's service*/
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware)
      // .exclude({ path: 'orders', method: RequestMethod.GET })
      .forRoutes(
        {path : 'orders/newOrder' , method : RequestMethod.POST},
        {path : '/orders/myOrders' , method : RequestMethod.GET},
      );
  }
}
