import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientEntity } from './clients.entity';
import { ClientResponseDto } from './dto/client-response.dto';

@Injectable()
export class ClientsService {
  /* default clients  */
  private clients: ClientEntity[] = [
    {
      id: 1,
      name: 'John Doe',
      country: 'USA',
      monthlyIncome: 1200,
      viseClub: true,
      cardType: 'Platinum',
    },
    {
      id: 2,
      name: 'Jane Smith',
      country: 'Canada',
      monthlyIncome: 800,
      viseClub: false,
      cardType: 'Gold',
    },
    {
      id: 3,
      name: 'Carlos Pérez',
      country: 'Colombia',
      monthlyIncome: 2000,
      viseClub: true,
      cardType: 'Black',
    },
  ];

  private idCounter = this.clients.length + 1;
   /* register a new client  */
  registerClient(client: CreateClientDto): ClientResponseDto {
    let isEligible = false;

    switch (client.cardType.toLowerCase()) {
      case 'classic':
        isEligible = true;
        break;
      case 'gold':
        isEligible = client.monthlyIncome >= 500;
        break;
      case 'platinum':
        isEligible = client.monthlyIncome >= 1000 && client.viseClub;
        break;
      case 'black':
      case 'white': {
        const blockedCountries = ['china', 'vietnam', 'india', 'irán', 'iran'];
        const isBlockedCountry = blockedCountries.includes(
          client.country.toLowerCase(),
        );

        isEligible =
          client.monthlyIncome >= 2000 &&
          client.viseClub &&
          !isBlockedCountry;
        break;
      }
      default:
        isEligible = false;
        break;
    }

    const newClient: ClientEntity = {
      id: this.idCounter++,
      ...client,
    };

    this.clients.push(newClient);

    return {
      status: isEligible ? 'Registered' : 'Rejected',
      clientId: newClient.id,
      cardType: newClient.cardType,
      data: newClient,
    };
  }
  /* Get all clients  */
  findAll(): ClientEntity[] {
    return this.clients;
  }
}
