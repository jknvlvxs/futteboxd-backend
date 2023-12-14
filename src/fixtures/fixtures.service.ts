import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFixtureDto } from './dto/create-fixture.dto';
import { UpdateFixtureDto } from './dto/update-fixture.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fixture } from './entities/fixture.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FixturesService {
  constructor(
    @InjectRepository(Fixture) private readonly repository: Repository<Fixture>,
  ) {}

  async create(createFixtureDto: CreateFixtureDto) {
    const fixtureExists = await this.repository.findOne({
      where: { fixture_id: createFixtureDto.fixture_id },
    });

    if (fixtureExists)
      throw new ConflictException(
        `Fixture with id ${createFixtureDto.fixture_id} already exists`,
      );

    const fixture = this.repository.create(createFixtureDto);

    return this.repository.save(fixture);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const fixture = this.repository.findOne({ where: { id: id } });

    if (!fixture)
      throw new ConflictException(`Fixture with id ${id} does not exist`);

    return fixture;
  }

  async update(id: string, updateFixtureDto: UpdateFixtureDto) {
    const fixture = await this.findOne(id);

    if (!fixture)
      throw new ConflictException(`Fixture with id ${id} does not exist`);

    const preload = await this.repository.preload({
      id: fixture.id,
      ...updateFixtureDto,
    });

    return this.repository.save(preload);
  }

  async remove(id: string) {
    const fixture = await this.findOne(id);

    if (!fixture)
      throw new ConflictException(`Fixture with id ${id} does not exist`);

    return this.repository.delete(fixture.id);
  }
}
