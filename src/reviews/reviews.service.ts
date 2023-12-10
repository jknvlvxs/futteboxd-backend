import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly repository: MongoRepository<Review>,
  ) {}

  create(createReviewDto: CreateReviewDto) {
    const create = this.repository.create(createReviewDto);
    return this.repository.save(create);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy(id);
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
