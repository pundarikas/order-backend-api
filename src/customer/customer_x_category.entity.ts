import { CommonData } from 'libs/common/common';
import { Category } from 'src/category/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';

@Entity({ name: 'customer_x_category', schema: 'order' })
export class CustomerXCategory extends CommonData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer', { name: 'customer_id' })
  customerId: number;

  @ManyToOne(() => Customer, (customer) => customer.id)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column('integer', { name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
