import { Order } from '../order.entity';

export interface OrderItem {
  itemId: number;
  itemName: string;
  discount: number;
  quantity: number;
  totalAmount: number;
  category: string;
}

export interface OrderResult {
  data: Order[];
  count: number;
}
