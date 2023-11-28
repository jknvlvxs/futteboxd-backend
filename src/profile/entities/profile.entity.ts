import { IsNotEmpty, Length } from 'class-validator';
import { ObjectId } from 'mongodb';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Profile extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ unique: true, nullable: false })
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  name: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  avatar: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
