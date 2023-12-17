import { Transform } from 'class-transformer';
import { League } from 'src/leagues/entities/league.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Team } from 'src/teams/entities/team.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Fixture extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  fixture_id: number;

  @Column({ nullable: false })
  event_timestamp: Date;

  @Column({ nullable: false })
  event_date: Date;

  @Column({ nullable: false })
  league_id: number;

  @ManyToOne(() => League, { eager: true, cascade: true, persistence: true })
  @Transform(({ value }) => value.id)
  league: League;

  @Column({ nullable: true })
  round: string;

  @Column({ nullable: false })
  homeTeam_id: number;

  @Column({ nullable: false })
  awayTeam_id: number;

  @ManyToOne(() => Team, { eager: true, cascade: true, persistence: true })
  @Transform(({ value }) => value.id)
  homeTeam: Team;

  @ManyToOne(() => Team, { eager: true, cascade: true, persistence: true })
  @Transform(({ value }) => value.id)
  awayTeam: Team;

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

  @OneToMany(() => Review, (review) => review.fixture)
  reviews: Review[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
