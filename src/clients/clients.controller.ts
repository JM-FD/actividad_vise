import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientResponseDto } from './dto/client-response.dto';
import { ClientEntity } from './clients.entity';

@Controller('client')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // fuerza que devuelva 201 como en el Hurl
  async registerClient(@Body() body: CreateClientDto): Promise<ClientResponseDto> {
    return this.clientsService.registerClient(body);
  }

  @Get()
  async findAll(): Promise<ClientEntity[]> {
    return this.clientsService.findAll();
  }
}
