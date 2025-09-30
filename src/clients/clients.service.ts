// Import necessary decorators and classes from NestJS and local files
import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto'; // DTO for client creation
import { ClientEntity } from './clients.entity'; // Entity representing a client
import { ClientResponseDto } from './dto/client-response.dto'; // DTO for response

// Marks the service as injectable so it can be used with dependency injection
@Injectable()
export class ClientsService {
  // In-memory array of pre-registered clients for testing/demo purposes
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

  // Counter to assign a new ID to each registered client
  private idCounter = this.clients.length + 1;

  // Method to register a new client and determine if they're eligible for the requested card
  registerClient(client: CreateClientDto): ClientResponseDto {
    let isEligible = false; // Flag to check if the client meets the requirements

    // Check card type and apply specific eligibility rules
    switch (client.cardType.toLowerCase()) {
      case 'classic':
        isEligible = true; // All clients are eligible for Classic cards
        break;
      case 'gold':
        isEligible = client.monthlyIncome >= 500; // Requires income >= 500
        break;
      case 'platinum':
        isEligible = client.monthlyIncome >= 1000 && client.viseClub; // Requires income >= 1000 and club membership
        break;
      case 'black':
      case 'white': {
        // List of countries that are blocked for these card types
        const blockedCountries = ['china', 'vietnam', 'india', 'irán', 'iran'];
        const isBlockedCountry = blockedCountries.includes(
          client.country.toLowerCase(),
        );

        // Requires income >= 2000, club membership, and not from a blocked country
        isEligible =
          client.monthlyIncome >= 2000 &&
          client.viseClub &&
          !isBlockedCountry;
        break;
      }
      default:
        // Unknown card type, automatically ineligible
        isEligible = false;
        break;
    }

    // Create the new client object with a unique ID
    const newClient: ClientEntity = {
      id: this.idCounter++,
      ...client,
    };

    // Add the new client to the list
    this.clients.push(newClient);

    // Return the registration status along with client information
    return {
      status: isEligible ? 'Registered' : 'Rejected',
      clientId: newClient.id,
      cardType: newClient.cardType,
      data: newClient,
    };
  }

  // Method to return all registered clients
  findAll(): ClientEntity[] {
    return this.clients;
  }
}
