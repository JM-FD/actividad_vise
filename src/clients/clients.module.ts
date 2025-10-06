import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

// This decorator defines a NestJS module
@Module({
  // The controller that handles incoming HTTP requests related to clients
  controllers: [ClientsController],
  // The provider (service) that contains the business logic for clients
  providers: [ClientsService],
  // Exporting the service so it can be used in other modules
  exports: [ClientsService]
})
// This is the module class for clients
export class ClientsModule {}