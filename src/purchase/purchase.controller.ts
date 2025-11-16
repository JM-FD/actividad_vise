// purchase.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { PurchaseService } from './purchase.service';

class PurchaseRequestDto {
  clientId: number;
  amount: number;
  date: string;
  country: string;
}

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  makePurchase(@Body() body: PurchaseRequestDto) {
    return this.purchaseService.processPurchase(
      body.clientId,
      body.amount,
      body.date,
      body.country,
    );
  }
}
