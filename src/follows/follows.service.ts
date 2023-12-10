import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { Repository } from 'typeorm';
import { CreateFollowDto } from './dto/create-follow.dto';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follow)
    private readonly repository: Repository<Follow>,
    @Inject(forwardRef(() => ProfileService))
    private readonly profileService: ProfileService,
  ) {}

  async follow(follow: CreateFollowDto) {
    const follower = await this.profileService.findByUserId(follow.follower);

    if (!follower)
      throw new NotFoundException(
        `Profile with user.id ${follow.follower} not found`,
      );

    const following = await this.profileService.findOne(follow.following);

    if (!following)
      throw new NotFoundException(
        `Profile with profile.id ${follow.following} not found`,
      );

    const verifyIfExists = await this.repository.findOne({
      where: {
        follower: { id: follower.id },
        following: { id: following.id },
      },
    });

    if (verifyIfExists) return this.remove(verifyIfExists.id);

    const create = this.repository.create({
      follower: { id: follower.id },
      following: { id: following.id },
    });

    return this.repository.save(create);
  }

  async findFollowers(id: string) {
    const followers = await this.repository.find({
      where: { following: { id } },
      relations: ['following', 'follower'],
    });
    return followers;
  }

  async findFollowing(id: string) {
    const following = await this.repository.find({
      where: { follower: { id } },
      relations: ['following', 'follower'],
    });
    return following;
  }

  async follows(follower: string, following: string) {
    const followerProfile =
      await this.profileService.findOneByUsername(follower);

    const followingProfile =
      await this.profileService.findOneByUsername(following);

    if (!followingProfile)
      throw new NotFoundException(
        `Profile with username ${following} not found`,
      );

    const follow = await this.repository.findOne({
      where: {
        follower: { id: followerProfile.id },
        following: { id: followingProfile.id },
      },
    });

    if (!follow)
      throw new NotFoundException(
        `Follow with follower ${follower} and following ${following} not found`,
      );

    return this.repository.softRemove(follow);
  }

  async remove(id: string) {
    const follow = await this.repository.findOne({ where: { id } });

    if (!follow) throw new NotFoundException(`Follow with id ${id} not found`);

    return this.repository.softRemove(follow);
  }
}
