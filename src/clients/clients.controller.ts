import { Controller, Post, Get, Body } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientResponseDto } from './dto/client-response.dto';

@Controller('client')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  registerClient(@Body() body: CreateClientDto): ClientResponseDto {
    return this.clientsService.registerClient(body);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }
}
