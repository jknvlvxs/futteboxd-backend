import {
  ConflictException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import 'moment-timezone';
import { TeamsService } from 'src/teams/teams.service';
import { Between, In, Repository } from 'typeorm';
import { CreateFixtureDto } from './dto/create-fixture.dto';
import { UpdateFixtureDto } from './dto/update-fixture.dto';
import { Fixture } from './entities/fixture.entity';
import { LeaguesService } from 'src/leagues/leagues.service';

@Injectable()
export class FixturesService {
  constructor(
    @InjectRepository(Fixture) private readonly repository: Repository<Fixture>,
    @Inject(forwardRef(() => TeamsService))
    private readonly teamRepository: TeamsService,
    @Inject(forwardRef(() => LeaguesService))
    private readonly leagueRepository: LeaguesService,
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
    const fixture = await this.repository.findOne({ where: { id: id } });

    if (!fixture)
      throw new ConflictException(`Fixture with id ${id} does not exist`);

    const league = await this.leagueRepository.findByLeagueId(
      fixture.league_id,
    );

    const result = await this.getTeamsByFixtures([fixture]);

    return { ...result[0], league };
  }

  async findLive() {
    const startOfDay = moment().tz('America/Sao_Paulo').startOf('day').toDate();
    const endOfDay = moment().tz('America/Sao_Paulo').endOf('day').toDate();

    const [liveFixtures, todayFixtures] = await Promise.all([
      this.repository.find({
        where: {
          statusShort: In(['1H', 'HT', '2H', 'ET', 'BT', 'P', 'SUSP', 'INT']),
        },
        order: { event_timestamp: 'ASC' },
      }),
      this.repository.find({
        where: {
          event_date: Between(startOfDay, endOfDay),
        },
        order: { event_timestamp: 'ASC' },
      }),
    ]);

    const [live, today] = await Promise.all([
      this.getTeamsByFixtures(liveFixtures),
      this.getTeamsByFixtures(todayFixtures),
    ]);

    return { live, today };
  }

  async findByLeagueId(id: number) {
    const fixtures = await this.repository.find({
      where: { league_id: id },
      order: { round: 'ASC', event_date: 'ASC', homeTeam: 'ASC' },
    });

    if (!fixtures) return [];

    return this.getTeamsByFixtures(fixtures);
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

  async getTeamsByFixtures(fixtures: Fixture[]) {
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
        } as Fixture;
      }),
    );
  }
}
