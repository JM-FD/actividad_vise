import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientResponseDto } from './dto/client-response.dto';
import { ClientEntity } from './clients.entity';

// This class is a controller in NestJS that manages requests related to "clients".
@Controller('client')
export class ClientsController {
  // The controller uses dependency injection to access the service layer (ClientsService).
  constructor(private readonly clientsService: ClientsService) {}

  // POST /client
  // This endpoint handles client registration.
  // It expects a request body of type CreateClientDto,
  // returns a ClientResponseDto, and responds with status code 201 (CREATED).
  @Post()
  @HttpCode(HttpStatus.CREATED) 
  async registerClient(@Body() body: CreateClientDto): Promise<ClientResponseDto> {
    return this.clientsService.registerClient(body);
  }

  // GET /client
  // This endpoint retrieves all clients stored in the system.
  // It returns an array of ClientEntity objects.
  @Get()
  async findAll(): Promise<ClientEntity[]> {
    return this.clientsService.findAll();
  }
}
