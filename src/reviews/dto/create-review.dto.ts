import { IsNotEmpty, Length } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateReviewDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  favorite: boolean;

  @IsNotEmpty()
  @Length(1, 10)
  rating: number;

  @IsNotEmpty()
  profile: ObjectId;
}
