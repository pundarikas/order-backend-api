import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';

export class InputItem {
  @IsNumber()
  @ApiProperty({
    type: Number,
  })
  itemId: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
  })
  quantity: number;
}

export class OrderCreateDto {
  @IsArray()
  @Type(() => InputItem)
  @ApiProperty({
    type: [InputItem],
  })
  items: InputItem[];

  @IsNumber()
  @ApiProperty({
    type: Number,
  })
  customerId: number;
}

export class FindOrderDto {
  @ApiProperty({
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty({
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  size: number;
}
