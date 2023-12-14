import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country) private readonly repository: Repository<Country>,
  ) {}

  create(createCountryDto: CreateCountryDto) {
    const create = this.repository.create(createCountryDto);
    return this.repository.save(create);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const Country = await this.repository.findOne({ where: { id } });

    if (!Country)
      throw new NotFoundException(`Country with id ${id} not found`);

    return Country;
  }

  async update(id: string, updateCountryDto: UpdateCountryDto) {
    const Country = await this.findOne(id);

    if (!Country)
      throw new NotFoundException(`Country with id ${id} not found`);

    const preload = await this.repository.preload({
      id: Country.id,
      ...updateCountryDto,
    });

    return this.repository.save(preload);
  }

  async remove(id: string) {
    const Country = await this.findOne(id);

    if (!Country)
      throw new NotFoundException(`Country with id ${id} not found`);

    return this.repository.softRemove(Country);
  }
}
