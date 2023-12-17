import { Transform } from 'class-transformer';
import { Fixture } from 'src/fixtures/entities/fixture.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column()
  favorite: boolean;

  @Column({ type: 'decimal', precision: 2, scale: 1 })
  rating: number;

  @ManyToOne(() => Profile, { eager: true })
  @Transform(({ value }) => value.id)
  profile: Profile;

  @ManyToOne(() => Fixture, { eager: true })
  @Transform(({ value }) => value.id)
  fixture: Fixture;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
