import { CreateClientDto } from './create-client.dto';

export class ClientResponseDto {
  message: string;
  data: CreateClientDto;
  eligible: boolean;
}
