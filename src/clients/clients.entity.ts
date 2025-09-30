// This class represents the "Client" entity used in the application.
// It defines the structure of the client object with its properties.
export class ClientEntity {
  // Unique identifier for the client
  id: number;

  // Full name of the client
  name: string;

  // Country where the client is located
  country: string;

  // Monthly income of the client
  monthlyIncome: number;

  // Indicates if the client is part of the "Vise Club" (true/false)
  viseClub: boolean;

  // Type of card the client owns (e.g., debit, credit, premium, etc.)
  cardType: string;
}
