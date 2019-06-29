import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { hashSync } from 'bcryptjs';
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

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @BeforeInsert()
    async hashPass() {
        this.password = await hashSync(this.password, 10);
    }


}