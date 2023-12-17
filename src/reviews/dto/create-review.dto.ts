import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Fixture } from 'src/fixtures/entities/fixture.entity';

export class CreateReviewDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  favorite: boolean;

  @Min(0)
  @Max(5)
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 1 })
  rating: number;

  @IsNotEmpty()
  fixture: Fixture;
}
