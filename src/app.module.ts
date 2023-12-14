import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsModule } from './reviews/reviews.module';
import { FollowsModule } from './follows/follows.module';
import { LeaguesModule } from './leagues/leagues.module';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProfileModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ReviewsModule,
    FollowsModule,
    LeaguesModule,
    CountriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
