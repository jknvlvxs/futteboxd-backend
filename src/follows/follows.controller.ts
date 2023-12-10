import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { FollowsService } from './follows.service';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post()
  create(@Body() createFollowDto: CreateFollowDto) {
    return this.followsService.create(createFollowDto);
  }

  @Get('followers/:id')
  findFollowers(@Param('id') id: string) {
    return this.followsService.findFollowers(id);
  }

  @Get('following/:id')
  findFollowing(@Param('id') id: string) {
    return this.followsService.findFollowing(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followsService.remove(id);
  }
}
