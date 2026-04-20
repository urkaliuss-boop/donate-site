import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, username: true, role: true, avatarUrl: true, steamId: true, discordId: true, createdAt: true }
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, username: true, role: true, avatarUrl: true, steamId: true, discordId: true, createdAt: true }
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: { id: true, email: true, username: true, role: true, avatarUrl: true, steamId: true, discordId: true, createdAt: true }
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
