import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { OrderItems } from './oderItems.entity';

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => OrderItems, oi => oi.order)
    orderItems: OrderItems[];

    @ManyToOne(type => User, user => user.orders)
    user: User;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}
