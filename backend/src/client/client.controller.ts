import {
  Controller,
  Get,
  Delete,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findAll(
    @Query('name') name?: string,
    @Query('birthday') birthday?: string,
    @Query('type') type?: string,
  ) {
    return this.clientService.findAll(name, birthday, type);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.delete(id);
  }
}
