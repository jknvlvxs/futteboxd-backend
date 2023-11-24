import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
      console.log(password);
    } else {
      return null;
    }
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = { email: user.email, sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
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

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
    };
  }
}
