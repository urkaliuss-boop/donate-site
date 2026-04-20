import { Module } from '@nestjs/common';
import { UserPurchasesService } from './user-purchases.service';
import { UserPurchasesController } from './user-purchases.controller';

@Module({
  controllers: [UserPurchasesController],
  providers: [UserPurchasesService],
})
export class UserPurchasesModule {}
