import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FixturesService } from 'src/fixtures/fixtures.service';
import { Repository } from 'typeorm';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { League } from './entities/league.entity';

@Injectable()
export class LeaguesService {
  constructor(
    @InjectRepository(League) private readonly repository: Repository<League>,
    private readonly fixturesService: FixturesService,
  ) {}

  async create(createLeagueDto: CreateLeagueDto) {
    const leagueExists = await this.repository.findOne({
      where: { league_id: createLeagueDto.league_id },
    });

    if (leagueExists) return leagueExists;

    const create = this.repository.create(createLeagueDto);
    return this.repository.save(create);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const league = await this.repository.findOne({ where: { id } });

    if (!league) throw new NotFoundException(`League with id ${id} not found`);

    const scores = await this.fixturesService.findByLeagueId(league.league_id);

    return { ...league, scores };
  }

  async findByLeagueId(league_id: number) {
    const league = await this.repository.findOne({ where: { league_id } });

    if (!league) return null;

    return league;
  }

  async findLeagues(country: string, season: number) {
    const leagues = await this.repository.find({
      where: { country, season },
    });

    if (!leagues)
      throw new NotFoundException(
        `Leagues with country ${country} and season ${season} not found`,
      );

    return leagues;
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
