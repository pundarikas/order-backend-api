import { Repository } from 'typeorm';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Customer } from 'src/customer/customer.entity';
import { CustomerService } from 'src/customer/customer.service';
import { Item } from 'src/item/item.entity';
import { ItemService } from 'src/item/item.service';

import { FindOrderDto, InputItem, OrderCreateDto } from './order.dto';
import { Order } from './order.entity';
import { OrderItem, OrderResult } from './types/order';
import { NumberUtils } from 'src/utilities/number_utils';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @Inject('ORDER_REPO')
    private orderRepo: Repository<Order>,
    private customerService: CustomerService,
    private itemService: ItemService,
  ) {}

  async findOrders(query: FindOrderDto): Promise<OrderResult> {
    const take = query.size || 10;
    const skip = query.page * query.size || 0;

    const [result, total] = await this.orderRepo.findAndCount({
      take: take,
      skip: skip,
    });
    return {
      data: result,
      count: total,
    };
  }

  async findOne(id: number): Promise<Order> {
    try {
      const order = await this.orderRepo.findOneByOrFail({ id });
      return order;
    } catch (error) {
      this.logger.error(error.message);
      throw new NotFoundException(error.message);
    }
  }

  async create(input: OrderCreateDto): Promise<Order> {
    const { customerId, items: inputItems } = input;
    try {
      const customer = await this.customerService.findById(customerId);

      const items = await this.itemService.findByIds(
        inputItems.map((item) => item.itemId),
      );

      const { orderItems, orderTotal } = await this._prepareOrderItems(
        items,
        inputItems,
        customer,
      );

      const order = this.orderRepo.create({ customer, orderItems, orderTotal });
      this.logger.log('Creating order...');
      return this.orderRepo.save(order);
    } catch (error) {
      throw error;
    }
  }

  private async _prepareOrderItems(
    items: Item[],
    inputItems: InputItem[],
    customer: Customer,
  ) {
    let orderTotal = 0;

    const customerCategories =
      await this.customerService.findCustomerCategories(customer.id);

    const memberCategoryNames = customerCategories.map(
      (customerCategory) => customerCategory.category.name,
    );

    const orderItems = inputItems.map((inputItem) => {
      const itemDetail = items.find((i) => i.id === inputItem.itemId);
      let discount = 0;
      const totalAmount = itemDetail.price * inputItem.quantity;

      if (memberCategoryNames?.includes(itemDetail.category?.name)) {
        discount = NumberUtils.calcPercentage(
          itemDetail.category.discount,
          totalAmount,
        );
      }

      const orderItem: OrderItem = {
        itemId: itemDetail.id,
        itemName: itemDetail.name,
        discount,
        quantity: inputItem.quantity,
        totalAmount: totalAmount - discount,
      };

      orderTotal += totalAmount - discount;

      return orderItem;
    });

    return { orderItems, orderTotal };
  }
}
