import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/auth/jwt.guard';
import { RoleAdminGuard } from 'src/auth/role.admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtGuard, RoleAdminGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any,
  ) {
    // check if the user is updating his own profile
    if (id == req.user.id) return this.userService.update(id, updateUserDto);
    else throw new UnauthorizedException('You cannot update this profile');
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    // check if the user is updating his own profile
    if (id == req.user.id) return this.userService.remove(id);
    else throw new UnauthorizedException('You cannot delete this profile');
  }
}
