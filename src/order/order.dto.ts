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

export class OrderInputDto {
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
