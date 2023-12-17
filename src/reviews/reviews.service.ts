import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly repository: Repository<Review>,
    @Inject(forwardRef(() => ProfileService))
    private readonly profileService: ProfileService,
  ) {}

  async create(user: string, createReviewDto: CreateReviewDto) {
    const profile = await this.profileService.findByUserId(user);
    const create = this.repository.create({ ...createReviewDto, profile });
    return this.repository.save(create);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  findByProfileId(profileId: string) {
    return this.repository.find({ where: { profile: { id: profileId } } });
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.findOne(id);

    if (!review) throw new NotFoundException(`Review with id ${id} not found`);

    const preload = await this.repository.preload({
      id: id,
      ...updateReviewDto,
    });

    return this.repository.save(preload);
  }

  async remove(id: string) {
    const review = await this.findOne(id);

    if (!review) throw new NotFoundException(`Review with id ${id} not found`);

    return this.repository.softRemove(review);
  }
}
