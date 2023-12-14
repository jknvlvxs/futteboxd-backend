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

  @Column({ type: 'timestamptz', nullable: false })
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

  @Column({ nullable: false })
  goalsHomeTeam: number;

  @Column({ nullable: false })
  goalsAwayTeam: number;

  @Column({ nullable: false })
  halftime_score: string;

  @Column({ nullable: false })
  final_score: string;

  @Column({ nullable: false })
  penalty: string;

  @Column({ nullable: false })
  elapsed: number;

  @Column({ type: 'timestamptz', nullable: false })
  firstHalfStart: Date;

  @Column({ type: 'timestamptz', nullable: false })
  secondHalfStart: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
