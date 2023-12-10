import { IsNotEmpty, Length } from 'class-validator';
import { Profile } from 'src/profile/entities/profile.entity';

export class CreateReviewDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  favorite: boolean;

  @IsNotEmpty()
  @Length(1, 10)
  rating: number;

  @IsNotEmpty()
  profile: Profile;
}
