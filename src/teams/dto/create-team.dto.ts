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
  @Max(3)
  @ValidateIf((e) => e === '')
  code: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  @ValidateIf((e) => e === '')
  logo: string;
}
