import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  avatar: string;

  @IsObject()
  @IsNotEmpty()
  user: User;
}
