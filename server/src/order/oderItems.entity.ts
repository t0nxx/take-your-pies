import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";
import { Pie } from '../pie/pie.entity';

@Entity()
export class OrderItems {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Order, order => order.orderItems)
    order: Order;

    @ManyToOne(type => Pie, pie => pie.orderItem)
    pie: Pie;

    @Column({ default: 1 })
    quantity: number;
}