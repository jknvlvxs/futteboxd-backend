import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { League } from './entities/league.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeaguesService {
  constructor(
    @InjectRepository(League) private readonly repository: Repository<League>,
  ) {}

  async create(createLeagueDto: CreateLeagueDto) {
    const leagueExists = await this.repository.findOne({
      where: { league_id: createLeagueDto.league_id },
    });

    if (leagueExists)
      throw new ConflictException(
        `League with id ${createLeagueDto.league_id} already exists`,
      );

    const create = this.repository.create(createLeagueDto);
    return this.repository.save(create);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const league = await this.repository.findOne({ where: { id } });

    if (!league) throw new NotFoundException(`League with id ${id} not found`);

    return league;
  }

  async update(id: string, updateLeagueDto: UpdateLeagueDto) {
    const league = await this.findOne(id);

    if (!league) throw new NotFoundException(`League with id ${id} not found`);

    const preload = await this.repository.preload({
      id: league.id,
      ...updateLeagueDto,
    });

    return this.repository.save(preload);
  }

  async remove(id: string) {
    const league = await this.findOne(id);

    if (!league) throw new NotFoundException(`League with id ${id} not found`);

    return this.repository.softRemove(league);
  }
}
