export class PurchaseResponseDto {
  status: string;
  purchase?: {
    discountApplied: number;
    finalAmount: number;
    benefit: string;
  };
  reason?: string; // en caso de rechazo
}
