import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UserPurchasesModule } from './user-purchases/user-purchases.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, UsersModule, ProductsModule, TransactionsModule, UserPurchasesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
