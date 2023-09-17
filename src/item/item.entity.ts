import { CommonData } from 'src/common';
import { Category } from 'src/category/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'item', schema: 'order' })
export class Item extends CommonData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column('varchar', { length: 10, nullable: true })
  itemNumber: string;

  @Column('float', { nullable: true })
  weight: number;

  @Column('varchar', { length: 20, nullable: true })
  color: string;

  @Column('varchar', { length: 30, nullable: true })
  flavor: string;

  @OneToOne(() => Category, (category) => category.id, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
