import { IsString, IsNumber, IsBoolean, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @Type(() => Number)
  @IsNumber()
  monthlyIncome: number;

  @IsBoolean()
  viseClub: boolean;

  @IsString()
  @IsNotEmpty()
  cardType: string;
}
