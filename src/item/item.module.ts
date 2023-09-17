import { TypeormModule } from '@app/database';
import { Module } from '@nestjs/common';
import { ItemProviders } from './item.providers';
import { ItemService } from './item.service';

@Module({
  imports: [TypeormModule],
  providers: [ItemService, ...ItemProviders],
  exports: [ItemService],
})
export class ItemModule {}
