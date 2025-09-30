import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class PurchaseRequestDto {
  @IsNumber()
  clientId: number;

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  purchaseCountry: string;

  @IsString()
  @IsNotEmpty()
  purchaseDate: string;
}
