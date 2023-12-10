import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowsService } from 'src/follows/follows.service';
import { ReviewsService } from 'src/reviews/reviews.service';
import { MongoRepository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly repository: MongoRepository<Profile>,
    private readonly reviewRepository: ReviewsService,
    private readonly followsService: FollowsService,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    return this.repository.save(this.repository.create(createProfileDto));
  }

  async findAll() {
    const profiles = await this.repository.find();

    return Promise.all(
      profiles.map(async (profile) => {
        const [reviews, following, followers] = await Promise.all([
          this.reviewRepository.findByProfileId(profile.id),
          this.followsService.findFollowing(profile.id),
          this.followsService.findFollowers(profile.id),
        ]);

        return { ...profile, reviews, following, followers };
      }),
    );
  }

  findOne(id: string) {
    return this.repository.findOneBy(id);
  }

  async findOneByUsername(username: string) {
    const profile = await this.repository.findOne({ where: { username } });

    if (!profile)
      throw new NotFoundException(
        `Profile with username ${username} not found`,
      );

    const [reviews, following, followers] = await Promise.all([
      this.reviewRepository.findByProfileId(profile.id),
      this.followsService.findFollowing(profile.id),
      this.followsService.findFollowers(profile.id),
    ]);

    return { ...profile, reviews, following, followers };
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.findOne(id);

    if (!profile)
      throw new NotFoundException(`Profile with id ${id} not found`);

    const preload = await this.repository.preload({
      id: id,
      ...updateProfileDto,
    });

    return this.repository.save(preload);
  }

  async remove(id: string) {
    const profile = await this.findOne(id);

    if (!profile)
      throw new NotFoundException(`Profile with id ${id} not found`);

    return this.repository.softRemove(profile);
  }
}
