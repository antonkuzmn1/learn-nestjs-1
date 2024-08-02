import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(createCatDto: CreateCatDto): Cat {
    const id = this.cats.length + 1;
    this.cats.push({ id, ...createCatDto });
    return this.cats[id - 1];
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    return this.cats[id - 1];
  }

  update(id: number, updateCatDto: UpdateCatDto): Cat {
    this.cats[id - 1] = { id, ...updateCatDto };
    return this.cats[id - 1];
  }

  remove(id: number): Cat[] {
    this.cats.splice(id - 1, 1);
    return this.cats;
  }
}
