import { Module, forwardRef } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from './entities/league.entity';
import { FixturesModule } from 'src/fixtures/fixtures.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([League]),
    forwardRef(() => FixturesModule),
  ],
  controllers: [LeaguesController],
  providers: [LeaguesService],
  exports: [LeaguesService],
})
export class LeaguesModule {}
