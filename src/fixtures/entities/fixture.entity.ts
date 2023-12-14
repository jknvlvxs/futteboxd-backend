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
export class Fixture extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false, primary: true })
  fixture_id: number;

  @Column({ nullable: false })
  event_timestamp: Date;

  @Column({ nullable: false })
  event_date: Date;

  @Column({ nullable: false })
  league_id: number;

  @Column({ nullable: false })
  homeTeam_id: number;

  @Column({ nullable: false })
  awayTeam_id: number;

  @Column({ nullable: false })
  homeTeam: string;

  @Column({ nullable: false })
  awayTeam: string;

  @Column({ nullable: false })
  status: string;

  @Column({ nullable: false })
  statusShort: string;

  @Column({ nullable: true })
  goalsHomeTeam: number;

  @Column({ nullable: true })
  goalsAwayTeam: number;

  @Column({ nullable: true })
  halftime_score: string;

  @Column({ nullable: true })
  final_score: string;

  @Column({ nullable: false })
  penalty: string;

  @Column({ nullable: false })
  elapsed: number;

  @Column({ nullable: false })
  firstHalfStart: Date;

  @Column({ nullable: false })
  secondHalfStart: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
