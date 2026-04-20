export class CreateTransactionDto {
  totalAmountCents!: number;
  currency?: string;
  paymentMethod?: string;
  productIds!: string[];
}
