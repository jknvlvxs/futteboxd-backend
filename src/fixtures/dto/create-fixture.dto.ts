import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsRFC3339,
  IsString,
} from 'class-validator';
import * as moment from 'moment';

export class CreateFixtureDto {
  @Transform((e) => parseInt(e.value))
  @IsNumber()
  @IsNotEmpty()
  fixture_id: number;

  @IsRFC3339()
  @IsNotEmpty()
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

  @Transform((e) => parseInt(e.value))
  @IsNumber()
  @IsNotEmpty()
  goalsHomeTeam: number;

  @Transform((e) => parseInt(e.value))
  @IsNumber()
  @IsNotEmpty()
  goalsAwayTeam: number;

  @IsNotEmpty()
  @IsString()
  halftime_score: string;

  @IsNotEmpty()
  @IsString()
  final_score: string;

  @IsNotEmpty()
  @IsString()
  penalty: string;

  @Transform((e) => parseInt(e.value))
  @IsNumber()
  @IsNotEmpty()
  elapsed: number;

  @IsRFC3339()
  @IsNotEmpty()
  firstHalfStart: Date;

  @IsRFC3339()
  @IsNotEmpty()
  secondHalfStart: Date;
}
