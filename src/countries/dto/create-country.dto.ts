import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  ValidateIf,
} from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @ValidateIf((e) => e === '')
  @Max(2)
  code: string;

  @IsString()
  @ValidateIf((e) => e === '')
  @IsUrl()
  @IsOptional()
  flag: string;
}
