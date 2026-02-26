import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { Transaction } from '../transactions/entities/transaction.entity'; // <--- Import Transaction
import { User } from '../users/entities/user.entity'; // <--- Import User

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

  // --- Thêm mối quan hệ với User ---
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}