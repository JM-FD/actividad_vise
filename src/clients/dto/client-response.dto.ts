import { ClientEntity } from '../clients.entity';

export class ClientResponseDto {
  status: 'Registered' | 'Rejected';
  clientId: number;
  cardType: string;
  data: ClientEntity;
}

