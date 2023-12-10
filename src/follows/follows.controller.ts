import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/auth/jwt.guard';
import { CreateFollowDto } from './dto/create-follow.dto';
import { FollowsService } from './follows.service';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @UseGuards(JwtGuard)
  @Post('')
  follow(@Request() req, @Body() body: CreateFollowDto) {
    return this.followsService.follow({
      follower: req.user.sub,
      following: body.following,
    });
  }

  @Get('followers/:id')
  findFollowers(@Param('id') id: string) {
    return this.followsService.findFollowers(id);
  }

  @Get('following/:id')
  findFollowing(@Param('id') id: string) {
    return this.followsService.findFollowing(id);
  }

  @UseGuards(JwtGuard)
  @Get(':username')
  follows(@Request() req, @Param('username') username: string) {
    return this.followsService.follows(req.user.username, username);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followsService.remove(id);
  }
}
