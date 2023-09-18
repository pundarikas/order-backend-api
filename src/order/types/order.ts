import { Order } from '../order.entity';

export interface OrderItem {
  itemId: number;
  itemName: string;
  discount: number;
  quantity: number;
  totalAmount: number;
}

export interface OrderResult {
  data: Order[];
  count: number;
}
