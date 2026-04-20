import { TransactionStatus } from '@prisma/client';
export class UpdateTransactionDto {
  status?: TransactionStatus;
  externalPaymentId?: string;
}
