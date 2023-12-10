import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'typeorm';

export class CreateFollowDto {
  @IsNotEmpty()
  follower: ObjectId;

  @IsNotEmpty()
  following: ObjectId;
}
