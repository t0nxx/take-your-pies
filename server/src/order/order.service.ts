import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Pie } from '../pie/pie.entity';
import { OrderItems } from './oderItems.entity';
import { PaginationDto } from '../shared/pagination.filter';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItems)
        private readonly orderItemsRepository: Repository<OrderItems>,
    ) { }

    /* get all orders  // for admin */
    async getAllorders(query: PaginationDto): Promise<any> {
        const [data, count] = await this.orderRepository.createQueryBuilder('order')
            .innerJoin('order.user', 'user')
            .addSelect(['user.id', 'user.email', 'user.name'])
            .take(query.limit)
            .skip(query.page * (query.page - 1))
            .getManyAndCount();
        return { data, count };
    }

    /* get one order // for delivery boy */
    async getOneOrder(id: number): Promise<any> {
        const findOne = await this.orderRepository.createQueryBuilder('order')
            .innerJoin('order.user', 'user')
            .addSelect(['user.id', 'user.number', 'user.name'])
            .innerJoinAndSelect('order.orderItems', 'order_items')
            .innerJoin('order_items.pie', 'pie')
            .addSelect(['pie.id', 'pie.price', 'pie.name'])
            .where(`order.id = ${id}`)
            .getOne();
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        return findOne;
    }

    /* get my orders */
    async getMyOrders(userID: number, query: PaginationDto) {
        const [data, count] = await this.orderRepository.createQueryBuilder('order')
            .innerJoin('order.user', 'user')
            .innerJoinAndSelect('order.orderItems', 'order_items')
            .innerJoinAndSelect('order_items.pie', 'pie')
            .where(`order.user = ${userID}`)
            .take(query.limit)
            .skip(query.page * (query.page - 1))
            .getManyAndCount();

        return { data, count };
    }

    /* add new order */
    async createNeworder(user: User, pies: Pie[]): Promise<any> {
        const order = new Order();
        order.user = user;

        /* save order in order table */
        const savedOrder = await this.orderRepository.save(order);

        /* save items in order_items table */
        pies.forEach(async pie => {
            const orderItem = new OrderItems();
            orderItem.order = savedOrder;
            orderItem.pie = pie;
            const u = await this.orderItemsRepository.save(orderItem);
        });
        return 'done';
    }

}
