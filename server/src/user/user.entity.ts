import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import { hashSync } from 'bcryptjs';
import { Order } from '../order/order.entity';
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    number: string;

    @Column()
    address: string;

    @Column({ /* select: false */ })
    password: string;

    @OneToMany(type => Order, order => order.user)
    orders: Order[] ;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @BeforeInsert()
    async hashPass() {
        this.password = await hashSync(this.password, 10);
    }


}