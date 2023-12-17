import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class League extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  league_id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  country: string;

  @Column({ nullable: true })
  country_code: string;

  @Column({ nullable: false })
  season: number;

  @Column({ nullable: false })
  season_start: Date;

  @Column({ nullable: false })
  season_end: Date;

  @Column({ nullable: false })
  logo: string;

  @Column({ nullable: false })
  flag: string;

  @Column({ nullable: false })
  standings: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
