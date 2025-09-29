import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class PurchaseRequestDto {
  @IsNumber()
  clientId: number;

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  purchaseDate: string;

  @IsString()
  @IsNotEmpty()
  purchaseCountry: string;
}
