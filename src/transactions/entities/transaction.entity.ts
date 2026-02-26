import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../../categories/category.entity'; // <--- Import Category từ thư mục cha
import { User } from '../../users/entities/user.entity'; // <--- Import User

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

  // --- Thêm mối quan hệ với User ---
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
