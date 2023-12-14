import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import * as moment from 'moment';

export class CreateFixtureDto {
  @Transform((e) => parseInt(e.value))
  @IsNumber()
  @IsNotEmpty()
  fixture_id: number;

  @IsNotEmpty()
  @Type(() => Date)
  @Transform(({ value }) => moment(value), { toClassOnly: true })
  event_timestamp: Date;

  @IsDate()
  @IsNotEmpty()
  @Transform((e) => moment(e.value, 'YYYY-MM-DD').toDate(), {
    toClassOnly: true,
  })
  event_date: Date;

  @Transform((e) => parseInt(e.value))
  @IsNumber()
  @IsNotEmpty()
  league_id: number;

  @IsNotEmpty()
  @IsString()
  round: string;

  @Transform((e) => parseInt(e.value))
  @IsNumber()
  @IsNotEmpty()
  homeTeam_id: number;

  @Transform((e) => parseInt(e.value))
  @IsNumber()
  @IsNotEmpty()
  awayTeam_id: number;

  @IsNotEmpty()
  @IsString()
  homeTeam: string;

  @IsNotEmpty()
  @IsString()
  awayTeam: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  statusShort: string;

  @Transform((e) => e && parseInt(e.value))
  @IsNumber({ allowNaN: true })
  @IsOptional()
  @IsNotEmpty()
  goalsHomeTeam: number;

  @Transform((e) => e && parseInt(e.value))
  @IsNumber({ allowNaN: true })
  @IsOptional()
  @IsNotEmpty()
  goalsAwayTeam: number;

  @IsOptional()
  @IsString()
  halftime_score: string;

  @IsOptional()
  @IsString()
  final_score: string;

  @IsNotEmpty()
  @IsString()
  penalty: string;

  @Transform((e) => parseInt(e.value))
  @IsNumber()
  @IsNotEmpty()
  elapsed: number;

  @IsNotEmpty()
  @Type(() => Date)
  @Transform(({ value }) => moment(value), { toClassOnly: true })
  firstHalfStart: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @Transform(({ value }) => moment(value), { toClassOnly: true })
  secondHalfStart: Date;
}
