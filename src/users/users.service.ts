import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repository: MongoRepository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(createUserDto.password, salt);

    const create = this.repository.create({
      ...createUserDto,
      password: hash,
      role: 'user',
    });
    const { password, ...user } = await this.repository.save(create);
    return user;
    console.log(password);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id: id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    const preload = await this.repository.preload({
      id: id,
      ...updateUserDto,
    });

    return this.repository.save(preload);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return this.repository.softRemove(user);
  }

  async findByEmail(email: string) {
    return this.repository.findOneBy({ email: email });
  }
}
