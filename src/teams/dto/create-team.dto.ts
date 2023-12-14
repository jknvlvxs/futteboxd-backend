import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  ValidateIf,
} from 'class-validator';

export class CreateTeamDto {
  @Transform((e) => parseInt(e.value))
  @IsNumber()
  @IsNotEmpty()
  team_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @ValidateIf((e) => e === '')
  @Max(3)
  code: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  logo: string;
}
