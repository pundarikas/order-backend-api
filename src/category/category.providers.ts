import { DataSource } from 'typeorm';
import { Category } from './category.entity';

export const CategoryProviders = [
  {
    provide: 'CATEGORY_REPO',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: ['DATA_SOURCE'],
  },
];
