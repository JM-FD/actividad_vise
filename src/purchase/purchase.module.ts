import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { ClientsModule } from '../clients/clients.module';

@Module({
  imports: [ClientsModule], // para poder inyectar ClientsService
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService], // opcional, si quieres usarlo en otro módulo
})
export class PurchaseModule {}
