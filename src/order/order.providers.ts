import { DataSource } from 'typeorm';
import { Order } from './order.entity';

export const OrderProviders = [
  {
    provide: 'ORDER_REPO',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
    inject: ['DATA_SOURCE'],
  },
];
