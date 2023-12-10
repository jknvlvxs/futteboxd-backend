import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFollowDto {
  @IsOptional()
  follower?: string;

  @IsNotEmpty()
  following: string;
}
