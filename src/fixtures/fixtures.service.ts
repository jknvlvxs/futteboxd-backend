import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import 'moment-timezone';
import { LeaguesService } from 'src/leagues/leagues.service';
import { CreateTeamDto } from 'src/teams/dto/create-team.dto';
import { TeamsService } from 'src/teams/teams.service';
import { Between, In, Repository } from 'typeorm';
import { CreateFixtureDto } from './dto/create-fixture.dto';
import { UpdateFixtureDto } from './dto/update-fixture.dto';
import { Fixture } from './entities/fixture.entity';

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

    if (fixtureExists) return fixtureExists;

    const teams = await this.findTeams(createFixtureDto);
    const league = await this.leagueRepository.findByLeagueId(
      createFixtureDto.league_id,
    );

    const fixture = this.repository.create({
      ...createFixtureDto,
      homeTeam: teams.homeTeam,
      awayTeam: teams.awayTeam,
      league,
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
      throw new NotFoundException(`Fixture with id ${id} does not exist`);

    const league = await this.leagueRepository.findByLeagueId(
      fixture.league_id,
    );

    return { ...fixture, league };
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

    return { live: liveFixtures, today: todayFixtures };
  }

  async findByLeagueId(id: number) {
    const fixtures = await this.repository.find({
      where: { league_id: id },
      order: { round: 'ASC', event_date: 'ASC', homeTeam: 'ASC' },
    });

    if (!fixtures) return [];

    return fixtures;
  }

  async update(id: string, updateFixtureDto: UpdateFixtureDto) {
    const fixture = await this.findOne(id);

    if (!fixture)
      throw new NotFoundException(`Fixture with id ${id} does not exist`);

    const teams = await this.findTeams(updateFixtureDto);

    const preload = await this.repository.preload({
      ...updateFixtureDto,
      id: fixture.id,
      homeTeam: teams.homeTeam,
      awayTeam: teams.awayTeam,
    });

    return this.repository.save(preload);
  }

  async remove(id: string) {
    const fixture = await this.findOne(id);

    if (!fixture)
      throw new NotFoundException(`Fixture with id ${id} does not exist`);

    return this.repository.delete(fixture.id);
  }

  async findTeams(fixture: CreateFixtureDto | UpdateFixtureDto) {
    const homeTeam = await this.teamRepository.findOrCreateTeam({
      team_id: fixture.homeTeam_id,
      name: fixture.homeTeam,
    } as CreateTeamDto);

    const awayTeam = await this.teamRepository.findOrCreateTeam({
      team_id: fixture.awayTeam_id,
      name: fixture.awayTeam,
    } as CreateTeamDto);

    return { homeTeam, awayTeam };
  }
}
