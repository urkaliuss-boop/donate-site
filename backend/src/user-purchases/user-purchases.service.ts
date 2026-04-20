import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserPurchaseDto } from './dto/create-user-purchase.dto';
import { UpdateUserPurchaseDto } from './dto/update-user-purchase.dto';

@Injectable()
export class UserPurchasesService {
  constructor(private prisma: PrismaService) {}

  create(createUserPurchaseDto: CreateUserPurchaseDto) {
    return this.prisma.userPurchase.create({
      data: createUserPurchaseDto
    });
  }

  findAll(userId?: string) {
    if (userId) {
      return this.prisma.userPurchase.findMany({ where: { userId }, include: { product: true } });
    }
    return this.prisma.userPurchase.findMany({ include: { user: true, product: true } });
  }

  findOne(id: string) {
    return this.prisma.userPurchase.findUnique({ where: { id }, include: { product: true } });
  }

  update(id: string, updateUserPurchaseDto: UpdateUserPurchaseDto) {
    return this.prisma.userPurchase.update({ where: { id }, data: updateUserPurchaseDto });
  }

  remove(id: string) {
    return this.prisma.userPurchase.delete({ where: { id } });
  }
}
