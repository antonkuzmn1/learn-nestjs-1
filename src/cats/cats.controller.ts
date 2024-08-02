import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): Cat {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: any): Cat {
    return this.catsService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: any, @Body() updateCatDto: UpdateCatDto): Cat {
    return this.catsService.update(params.id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param() params: any): Cat[] {
    return this.catsService.remove(params.id);
  }
}
