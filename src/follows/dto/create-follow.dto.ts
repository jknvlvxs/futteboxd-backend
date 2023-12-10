import { IsNotEmpty } from 'class-validator';
import { Profile } from 'src/profile/entities/profile.entity';

export class CreateFollowDto {
  @IsNotEmpty()
  follower: Profile;

  @IsNotEmpty()
  following: Profile;
}
