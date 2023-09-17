import { Repository } from 'typeorm';
import { Inject, Injectable, Logger } from '@nestjs/common';

import { Customer } from 'src/customer/customer.entity';
import { CustomerService } from 'src/customer/customer.service';
import { Item } from 'src/item/item.entity';
import { ItemService } from 'src/item/item.service';

import { InputItem, OrderInputDto } from './order.dto';
import { Order } from './order.entity';
import { OrderItem } from './types/order';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @Inject('ORDER_REPO')
    private orderRepo: Repository<Order>,
    private customerService: CustomerService,
    private itemService: ItemService,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find();
  }

  async create(input: OrderInputDto): Promise<Order> {
    const { customerId, items: inputItems } = input;

    const customer = await this.customerService.findById(customerId);

    const items = await Promise.all(
      inputItems.map(async (inputItem) => {
        return this.itemService.findById(inputItem.itemId);
      }),
    );

    const { orderItems, orderTotal } = await this._prepareOrderItems(
      items,
      inputItems,
      customer,
    );

    const order = new Order();
    order.customer = customer;
    order.orderItems = orderItems;
    order.orderTotal = orderTotal;

    this.logger.log('Saving order...', order);

    return this.orderRepo.save(order);
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
        discount = (itemDetail.category.discount / 100) * totalAmount;
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
