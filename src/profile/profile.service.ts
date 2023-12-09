import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly repository: MongoRepository<Profile>,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    return this.repository.save(this.repository.create(createProfileDto));
  }

  findAll() {
    return this.repository.find();
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

    return profile;
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
