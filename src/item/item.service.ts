import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemService {
  constructor(
    @Inject('ITEM_REPO')
    private itemRepo: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return this.itemRepo.find();
  }

  async findById(id: number): Promise<Item> {
    try {
      return await this.itemRepo.findOneBy({ id });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
