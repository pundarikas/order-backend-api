import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CommonData {
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'modified_at' })
  modifiedAt: Date;
}
