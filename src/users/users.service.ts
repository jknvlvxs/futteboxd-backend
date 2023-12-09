import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ProfileService } from 'src/profile/profile.service';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import * as sha256 from 'crypto-js/sha256';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repository: MongoRepository<User>,
    @Inject(forwardRef(() => ProfileService))
    private readonly profileService: ProfileService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(createUserDto.password, salt);

    const create = this.repository.create({
      ...createUserDto,
      password: hash,
      role: 'user',
    });

    this.profileService.create({
      username: create.username,
      name: create.username,
      avatar: `https://gravatar.com/avatar/${sha256(create.email)}?s=800`,
      user: create.id,
    } as CreateProfileDto);

    return this.repository.save(create);
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

  async findByUsername(username: string) {
    return this.repository.findOneBy({ username: username });
  }

  async verifyIfUserExists(email: string, username: string) {
    const verifyEmail = this.findByEmail(email);
    const verifyUsername = this.findByUsername(username);

    const [emailExists, usernameExists] = await Promise.all([
      verifyEmail,
      verifyUsername,
    ]);

    if (emailExists || usernameExists) {
      return true;
    } else {
      return false;
    }
  }
}
