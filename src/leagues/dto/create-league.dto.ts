import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  ValidateIf,
} from 'class-validator';
import * as moment from 'moment';

export class CreateLeagueDto {
  @Transform((e) => parseInt(e.value))
  @IsNumber()
  @IsNotEmpty()
  league_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsOptional()
  @ValidateIf((e) => e === '')
  @Max(2)
  country_code: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform((e) => parseInt(e.value))
  season: number;

  @IsDate()
  @IsNotEmpty()
  @Transform((e) => moment(e.value, 'YYYY-MM-DD').toDate(), {
    toClassOnly: true,
  })
  season_start: Date;

  @IsDate()
  @IsNotEmpty()
  @Transform((e) => moment(e.value, 'YYYY-MM-DD').toDate(), {
    toClassOnly: true,
  })
  season_end: Date;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  logo: string;

  @IsString()
  @ValidateIf((e) => e === '')
  @IsUrl()
  @IsOptional()
  flag: string;

  @IsBoolean()
  @IsNotEmpty()
  standings: boolean;
}
