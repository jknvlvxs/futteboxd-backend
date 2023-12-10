import { IsNotEmpty } from 'class-validator';
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
export class Follow {
  @ObjectIdColumn()
  id: ObjectId;

  @Column(() => Profile)
  @IsNotEmpty()
  follower: Profile;

  @Column(() => Profile)
  @IsNotEmpty()
  following: Profile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
