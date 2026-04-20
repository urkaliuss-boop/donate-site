export class CreateUserPurchaseDto {
  userId!: string;
  productId!: string;
  transactionId?: string;
  expiresAt?: string;
  isActive?: boolean;
}
