import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientResponseDto } from './dto/client-response.dto';
import { ClientEntity } from './clients.entity';


@Injectable()
export class ClientsService {
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

  registerClient(client: CreateClientDto): ClientResponseDto {
    let isEligible = false;
    let reason = '';

    switch (client.cardType.toLowerCase()) {
      case 'classic':
        isEligible = true;
        break;
      case 'gold':
        isEligible = client.monthlyIncome >= 500;
        if (!isEligible) reason = 'Ingreso mínimo requerido: 500 USD';
        break;
      case 'platinum':
        isEligible = client.monthlyIncome >= 1000 && client.viseClub;
        if (!isEligible) {
          reason =
            'Ingreso mínimo de 1000 USD y suscripción VISE CLUB son requeridos';
        }
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

        if (!isEligible) {
          reason =
            'Requiere ingreso mínimo de 2000 USD, suscripción VISE CLUB y no residir en China, Vietnam, India o Irán';
        }
        break;
      }
      default:
        reason = 'Tipo de tarjeta no reconocido';
        break;
    }

    const newClient: ClientEntity = {
      id: this.idCounter++,
      ...client,
    };

    this.clients.push(newClient);

    return {
      message: isEligible
        ? `El cliente ${client.name} es apto para la tarjeta ${client.cardType}`
        : `El cliente ${client.name} NO es apto para la tarjeta ${client.cardType}. ${reason}`,
      data: newClient,
      eligible: isEligible,
    };
  }

  findAll(): ClientEntity[] {
    return this.clients;
  }
}
