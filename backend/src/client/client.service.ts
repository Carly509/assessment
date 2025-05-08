import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async findAll(name?: string, birthday?: string, type?: string) {
    return this.prisma.client.findMany({
      where: {
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
        birthday: birthday || undefined,
        type: type || undefined,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.client.delete({ where: { id } });
  }
}
