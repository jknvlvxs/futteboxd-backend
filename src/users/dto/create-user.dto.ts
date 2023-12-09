import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword(
    {
      minSymbols: 0,
      minLength: 8,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
    },
    { message: 'A senha deve conter no mínimo 8 caracteres' },
  )
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
