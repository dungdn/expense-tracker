import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from '../transactions/entities/transaction.entity'; // <--- Import Transaction

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  // 1 Category có nhiều Transaction
  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];
}