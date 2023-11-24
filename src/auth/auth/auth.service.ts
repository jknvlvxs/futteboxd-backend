import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as sha256 from 'crypto-js/sha256';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    console.log(user);

    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      console.log(compare);
      if (compare) {
        const { password, ...result } = user;
        return result as User;
        console.log(password);
      }
    }

    return null;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) throw new UnauthorizedException('Oops! Usuário não encontrado');

    return this.validateUserByJwt(user);
  }

  async register(body: CreateUserDto) {
    const verify = await this.usersService.verifyIfUserExists(
      body.email,
      body.username,
    );
    if (verify)
      throw new UnauthorizedException(
        'Oops! Nome de usuário ou email já cadastrado',
      );

    const user = await this.usersService.create(body);

    return this.validateUserByJwt(user);
  }

  async validateUserByJwt(user: User) {
    const hash = sha256(user.email);
    const avatar = `https://gravatar.com/avatar/${hash}`;

    return {
      access_token: this.jwtService.sign({
        email: user.email,
        username: user.username,
        sub: user.id,
        avatar,
      }),
    };
  }
}
