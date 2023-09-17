import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CustomerXCategory } from './customer_x_category.entity';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    @Inject('CUSTOMER_REPO')
    private customerRepo: Repository<Customer>,
    @Inject('CUSTOMER_X_CATEGORY_REPO')
    private customerCategoryRepo: Repository<CustomerXCategory>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customerRepo.find();
  }

  async findById(id: number): Promise<Customer> {
    return this.customerRepo.findOneBy({ id });
  }

  async findCustomerCategories(
    customerId: number,
  ): Promise<CustomerXCategory[]> {
    this.logger.log(
      'Fetching customer categories for customerId : ' + customerId,
    );
    return this.customerCategoryRepo.find({
      relations: {
        customer: true,
        category: true,
      },
      where: { customerId },
    });
  }
}
