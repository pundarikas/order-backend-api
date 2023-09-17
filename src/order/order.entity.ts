import { CommonData } from 'libs/common/common';
import { Customer } from 'src/customer/customer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './types/order';

@Entity({ name: 'order', schema: 'order' })
export class Order extends CommonData {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.id)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column('jsonb', { name: 'order_items' })
  orderItems: OrderItem[];

  @Column('float')
  orderTotal: number;
}
