import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsStrongPassword,
  Length,
} from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ unique: true, nullable: false })
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @Column({ unique: true, nullable: false })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsEnum(['admin', 'user'])
  role: string;

  @Column({ nullable: true })
  profile: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
