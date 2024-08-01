import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { INestApplication } from '@nestjs/common';
import { CatsModule } from './cats.module';
import * as request from 'supertest';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

describe('CatsController', () => {
  let app: INestApplication;
  let catsService = {
    create: (createCatDto: CreateCatDto) => 'This action adds a new cat',
    findAll: () => 'This action returns all cats',
    findOne: (id: string) => `This action returns a #${id} cat`,
    update: (id: string, updateCatDto: UpdateCatDto) => `This action updates a #${id} cat`,
    remove: (id: string) => `This action removes a #${id} cat`,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test
      .createTestingModule({
        imports: [CatsModule],
      })
      .overrideProvider(CatsService)
      .useValue(catsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST cats', () => {
    const createCatDto: CreateCatDto = { name: 'Kitty', age: 2, breed: 'Maine Coon' };
    return request(app.getHttpServer())
      .post('/cats')
      .send(createCatDto)
      .expect(201)
      .expect(catsService.create(createCatDto));
  });

  it('/GET cats', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect(catsService.findAll());
  });

  it('/GET cats/:id', () => {
    return request(app.getHttpServer())
      .get('/cats/13')
      .expect(200)
      .expect(catsService.findOne('13'));
  });

  it('/PATCH cats/:id', () => {
    const updateCatDto: UpdateCatDto = { name: 'Kitty', age: 3, breed: 'Maine Coon' };
    return request(app.getHttpServer())
      .patch('/cats/13')
      .send(updateCatDto)
      .expect(200)
      .expect(catsService.update('13', updateCatDto));
  });

  it('/DELETE cats/:id', () => {
    return request(app.getHttpServer())
      .delete('/cats/13')
      .expect(200)
      .expect(catsService.remove('13'));
  });

});
