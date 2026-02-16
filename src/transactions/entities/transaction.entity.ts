import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../../categories/category.entity'; // <--- Import Category từ thư mục cha

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  note: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  // Nhiều Transaction thuộc về 1 Category
  @ManyToOne(() => Category, (category) => category.transactions, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}