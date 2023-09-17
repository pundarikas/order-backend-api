import { CommonData } from 'src/common';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerXCategory } from './customer_x_category.entity';

@Entity({ name: 'customer', schema: 'order' })
export class Customer extends CommonData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('varchar', { nullable: true })
  email: string;

  @Column('varchar', { length: 15, name: 'phone_number', nullable: true })
  phoneNumber: string;

  @OneToMany(
    () => CustomerXCategory,
    (customerXCategory) => customerXCategory.customer,
  )
  memberCategories: CustomerXCategory[];
}
