import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Đánh dấu class này là một bảng trong DB
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Tên danh mục (VD: Ăn uống)

  @Column({ nullable: true })
  description: string; // Mô tả (tùy chọn)
}