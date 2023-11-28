import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'typeorm';

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

  @IsString()
  @IsNotEmpty()
  user: ObjectId;
}
