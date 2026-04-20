import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserPurchasesService } from './user-purchases.service';
import { CreateUserPurchaseDto } from './dto/create-user-purchase.dto';
import { UpdateUserPurchaseDto } from './dto/update-user-purchase.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('purchases')
export class UserPurchasesController {
  constructor(private readonly userPurchasesService: UserPurchasesService) {}

  @Roles(UserRole.admin)
  @Post()
  create(@Body() createUserPurchaseDto: CreateUserPurchaseDto) {
    return this.userPurchasesService.create(createUserPurchaseDto);
  }

  @Get()
  findMy(@Request() req: any) {
    return this.userPurchasesService.findAll(req.user.role === 'admin' ? undefined : req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPurchasesService.findOne(id);
  }

  @Roles(UserRole.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserPurchaseDto: UpdateUserPurchaseDto) {
    return this.userPurchasesService.update(id, updateUserPurchaseDto);
  }

  @Roles(UserRole.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPurchasesService.remove(id);
  }
}
