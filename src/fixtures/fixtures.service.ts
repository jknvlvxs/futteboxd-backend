import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFixtureDto } from './dto/create-fixture.dto';
import { UpdateFixtureDto } from './dto/update-fixture.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fixture } from './entities/fixture.entity';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { TeamsService } from 'src/teams/teams.service';

@Injectable()
export class FixturesService {
  constructor(
    @InjectRepository(Fixture) private readonly repository: Repository<Fixture>,
    private readonly teamRepository: TeamsService,
  ) {}

  async create(createFixtureDto: CreateFixtureDto) {
    const fixtureExists = await this.repository.findOne({
      where: { fixture_id: createFixtureDto.fixture_id },
    });

    if (fixtureExists)
      throw new ConflictException(
        `Fixture with id ${createFixtureDto.fixture_id} already exists`,
      );

    const fixture = this.repository.create({
      ...createFixtureDto,
      event_timestamp: moment(
        parseInt(createFixtureDto.event_timestamp.toString()) * 1000,
      ),
      firstHalfStart: moment(
        parseInt(createFixtureDto.firstHalfStart.toString()) * 1000,
      ),
      secondHalfStart: moment(
        parseInt(createFixtureDto.secondHalfStart.toString()) * 1000,
      ),
    });

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

  async findByLeagueId(id: number) {
    const fixtures = await this.repository.find({
      where: { league_id: id },
      order: { round: 'ASC', event_date: 'ASC', homeTeam: 'ASC' },
    });

    if (!fixtures) return [];

    return Promise.all(
      fixtures.map(async (fixture) => {
        const homeTeam = await this.teamRepository.findByTeamId(
          fixture.homeTeam_id,
        );
        const awayTeam = await this.teamRepository.findByTeamId(
          fixture.awayTeam_id,
        );

        return {
          ...fixture,
          homeTeam: homeTeam ? homeTeam : fixture.homeTeam,
          awayTeam: awayTeam ? awayTeam : fixture.awayTeam,
        };
      }),
    );
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
