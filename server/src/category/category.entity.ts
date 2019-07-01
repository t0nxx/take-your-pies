import { Entity, Tree, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, TreeLevelColumn } from 'typeorm';

@Entity()
@Tree('closure-table')
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    /* multi level Children */
    @TreeChildren()
    children: Category[];

    @TreeParent()
    parent: Category;
}
