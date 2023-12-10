import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongodb';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Follow {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @IsNotEmpty()
  follower: ObjectId;

  @Column()
  @IsNotEmpty()
  following: ObjectId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
