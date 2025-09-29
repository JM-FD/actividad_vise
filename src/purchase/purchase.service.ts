import { Injectable } from '@nestjs/common';
import { PurchaseResponseDto } from './dto/purchase-response.dto';

@Injectable()
export class PurchaseService {
  processPurchase(client: any, amount: number, date: string, country: string): PurchaseResponseDto {
    let discountApplied = 0;
    let benefit = '';

    const purchaseDate = new Date(date);
    const day = purchaseDate.getDay();
    const isWeekend = day === 0 || day === 6;
    const isMonWed = day >= 1 && day <= 3;
    const isSaturday = day === 6;

    switch (client.cardType.toLowerCase()) {
      case 'gold':
        if (amount > 100 && day === 1) {
          discountApplied = amount * 0.15;
          benefit = '15% discount (Monday special)';
        }
        break;

      case 'platinum':
        if (amount > 200 && isSaturday) {
          discountApplied = amount * 0.3;
          benefit = '30% weekend discount';
        } else if (amount > 100 && isMonWed) {
          discountApplied = amount * 0.2;
          benefit = '20% weekday discount';
        } else if (country.toLowerCase() !== 'usa') {
          discountApplied = amount * 0.05;
          benefit = '5% foreign purchase discount';
        }
        break;

      case 'black':
        if (amount > 200 && isSaturday) {
          discountApplied = amount * 0.35;
          benefit = '35% weekend discount';
        } else if (amount > 100 && isMonWed) {
          discountApplied = amount * 0.25;
          benefit = '25% weekday discount';
        } else if (country.toLowerCase() !== 'usa') {
          discountApplied = amount * 0.05;
          benefit = '5% foreign purchase discount';
        }
        break;

      case 'white':
        if (amount > 200 && isWeekend) {
          discountApplied = amount * 0.35;
          benefit = '35% weekend discount';
        } else if (amount > 100 && day >= 1 && day <= 5) {
          discountApplied = amount * 0.25;
          benefit = '25% weekday discount';
        } else if (country.toLowerCase() !== 'usa') {
          discountApplied = amount * 0.05;
          benefit = '5% foreign purchase discount';
        }
        break;
    }

    const finalAmount = amount - discountApplied;

    return {
      status: 'Approved',
      purchase: {
        discountApplied: Math.round(discountApplied),
        finalAmount: Math.round(finalAmount),
        benefit,
      },
    };
  }
}
