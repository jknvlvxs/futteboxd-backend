import { IsNotEmpty, Length } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Profile } from 'src/profile/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Review {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @IsNotEmpty()
  text: string;

  @Column()
  @IsNotEmpty()
  favorite: boolean;

  @Column()
  @IsNotEmpty()
  @Length(1, 10)
  rating: number;

  @Column()
  @IsNotEmpty()
  profile: Profile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
