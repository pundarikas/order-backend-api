import { Category } from 'src/category/category.entity';
import { Customer } from 'src/customer/customer.entity';
import { CustomerXCategory } from 'src/customer/customer_x_category.entity';
import { Item } from 'src/item/item.entity';
import { Order } from 'src/order/order.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
        entities: [Item, Customer, Order, Category, CustomerXCategory],
        // synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
