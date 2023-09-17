import { CommonData } from 'libs/common/common';
import { CustomerXCategory } from 'src/customer/customer_x_category.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'category', schema: 'order' })
export class Category extends CommonData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 15 })
  name: string;

  @Column('int')
  discount: number;

  @OneToMany(
    () => CustomerXCategory,
    (customerXCategory) => customerXCategory.category,
  )
  memberCategories: CustomerXCategory[];
}
