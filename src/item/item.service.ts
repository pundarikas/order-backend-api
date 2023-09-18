import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemService {
  private readonly logger = new Logger(ItemService.name);

  constructor(
    @Inject('ITEM_REPO')
    private itemRepo: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return this.itemRepo.find();
  }

  async findById(id: number): Promise<Item> {
    try {
      const item = await this.itemRepo.findOneBy({ id });
      return item;
    } catch (error) {
      this.logger.error(error.message);
      throw new NotFoundException(error.message);
    }
  }

  async findByIds(ids: number[]): Promise<Item[]> {
    try {
      const items = await this.itemRepo.find({ where: { id: In(ids) } });

      if (items.length !== ids.length) {
        throw new NotFoundException(
          'Some of the selected items are unavailable',
        );
      }

      return items;
    } catch (error) {
      this.logger.error(error.message);
      throw new NotFoundException(error.message);
    }
  }
}
