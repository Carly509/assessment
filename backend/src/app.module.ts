import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ClientModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
