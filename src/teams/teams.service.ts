import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private readonly repository: Repository<Team>,
  ) {}

  private readonly logger = new Logger(TeamsService.name);

  async create(createTeamDto: CreateTeamDto) {
    const teamExists = await this.repository.findOne({
      where: { team_id: createTeamDto.team_id },
    });

    if (teamExists) return teamExists;

    try {
      const create = this.repository.create(createTeamDto);
      return this.repository.save(create);
    } catch (error) {
      this.logger.error('Ocorreu um erro ao criar o time');
      return new InternalServerErrorException('Error while creating team');
    }
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const team = await this.repository.findOne({ where: { id } });

    if (!team) throw new NotFoundException(`Team with id ${id} not found`);

    return team;
  }

  async findByTeamId(id: number) {
    const team = await this.repository.findOne({ where: { team_id: id } });

    if (!team) return null;

    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    const team = await this.repository.findOne({ where: { id } });

    if (!team) throw new NotFoundException(`Team with id ${id} not found`);

    const preload = await this.repository.preload({
      id: team.id,
      ...updateTeamDto,
    });

    return this.repository.save(preload);
  }

  async remove(id: string) {
    const team = await this.repository.findOne({ where: { id } });

    if (!team) throw new NotFoundException(`Team with id ${id} not found`);

    return this.repository.softRemove(team);
  }

  async findOrCreateTeam(team: CreateTeamDto) {
    const teamExists = await this.findByTeamId(team.team_id);

    if (teamExists) return teamExists;

    let code = team.name
      .split(' ')
      .map((word) => word[0])
      .join('');

    if (code.length > 3) code = code.substring(0, 3);
    if (code.length < 3) code = team.name.substring(0, 3);

    const create = this.repository.create({
      team_id: team.team_id,
      name: team.name,
      code: code.toUpperCase(),
    });

    return this.repository.save(create);
  }
}
