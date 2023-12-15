import { Module, forwardRef } from '@nestjs/common';
import { FixturesService } from './fixtures.service';
import { FixturesController } from './fixtures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fixture } from './entities/fixture.entity';
import { TeamsModule } from 'src/teams/teams.module';
import { LeaguesModule } from 'src/leagues/leagues.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fixture]),
    forwardRef(() => TeamsModule),
    forwardRef(() => LeaguesModule),
  ],
  controllers: [FixturesController],
  providers: [FixturesService],
  exports: [FixturesService],
})
export class FixturesModule {}
