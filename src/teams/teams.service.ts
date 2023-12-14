import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private readonly repository: Repository<Team>,
  ) {}

  create(createTeamDto: CreateTeamDto) {
    const create = this.repository.create(createTeamDto);
    return this.repository.save(create);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const team = await this.repository.findOne({ where: { id } });

    if (!team) throw new NotFoundException(`Team with id ${id} not found`);

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
}
