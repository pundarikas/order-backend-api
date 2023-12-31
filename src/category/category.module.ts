import { TypeormModule } from '@app/database';
import { Module } from '@nestjs/common';
import { CategoryProviders } from './category.providers';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeormModule],
  providers: [CategoryService, ...CategoryProviders],
})
export class CategoryModule {}
