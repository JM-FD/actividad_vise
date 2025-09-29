import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { ClientsService } from '../clients/clients.service';
import { PurchaseRequestDto } from './dto/purchase-request.dto';
import { PurchaseResponseDto } from './dto/purchase-response.dto';


@Controller('purchase')
export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService,
    private readonly clientsService: ClientsService,
  ) {}

  @Post()
  @HttpCode(201)
  makePurchase(@Body() body: PurchaseRequestDto): PurchaseResponseDto {
    const { clientId, amount, purchaseDate, purchaseCountry } = body;
    const client = this.clientsService.findAll().find((c) => c.id === clientId);

    if (!client) {
      return { status: 'Rejected', reason: 'Client not found' };
    }

    return this.purchaseService.processPurchase(
      client,
      amount,
      purchaseDate,
      purchaseCountry,
    );
  }
}
