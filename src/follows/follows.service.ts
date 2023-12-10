import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateFollowDto } from './dto/create-follow.dto';
import { Follow } from './entities/follow.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follow)
    private readonly repository: MongoRepository<Follow>,
  ) {}

  create(createFollowDto: CreateFollowDto) {
    const create = this.repository.create(createFollowDto);
    return this.repository.save(create);
  }

  findFollowers(id: ObjectId) {
    return this.repository.find({ following: id });
  }

  findFollowing(id: ObjectId) {
    return this.repository.find({ follower: id });
  }

  async remove(id: string) {
    const follow = await this.repository.findOneBy(id);

    if (!follow) throw new NotFoundException(`Follow with id ${id} not found`);

    return this.repository.softRemove(follow);
  }
}
