import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        userId,
        totalAmountCents: createTransactionDto.totalAmountCents,
        currency: createTransactionDto.currency,
        paymentMethod: createTransactionDto.paymentMethod,
        items: {
          create: createTransactionDto.productIds.map(id => ({ productId: id, priceCents: 0 }))
        }
      }
    });
  }

  findAll() { return this.prisma.transaction.findMany({ include: { items: true } }); }

  findOne(id: string) { return this.prisma.transaction.findUnique({ where: { id }, include: { items: true } }); }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.prisma.transaction.update({ where: { id }, data: updateTransactionDto });
  }

  remove(id: string) {
    return this.prisma.transaction.delete({ where: { id } });
  }
}
