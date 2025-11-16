// purchase.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseRequestDto } from './dto/purchase-request.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

   @Post()
  makePurchase(@Body() body: PurchaseRequestDto) {
    return this.purchaseService.processPurchase(
      body.clientId,
      body.amount,
      body.purchaseDate,    
      body.purchaseCountry, 
    );
  }
}
