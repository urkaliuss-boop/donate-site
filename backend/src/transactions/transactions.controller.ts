import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Request() req: any, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(req.user.id, createTransactionDto);
  }

  @Roles(UserRole.admin)
  @Get()
  findAll() { return this.transactionsService.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.transactionsService.findOne(id); }

  @Roles(UserRole.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Roles(UserRole.admin)
  @Delete(':id')
  remove(@Param('id') id: string) { return this.transactionsService.remove(id); }
}
