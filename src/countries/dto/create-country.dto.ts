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
  country: string;

  @IsString()
  @IsOptional()
  @ValidateIf((e) => e === '')
  @Max(2)
  country_code: string;

  @IsString()
  @ValidateIf((e) => e === '')
  @IsUrl()
  @IsOptional()
  flag: string;
}
