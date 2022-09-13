import request from 'supertest';
import App from '@/app';
import { CreateAcronymDto } from '@dtos/acronyms.dto';
import { Acronym } from '@interfaces/acronyms.interface';
import acronymModel from '@models/acronyms.model';
import AcronymRoute from '@routes/acronyms.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Acronyms', () => {
  describe('[GET] /acronym', () => {
    it('response statusCode 200 / findAll', () => {
      const findAcronym: Acronym[] = acronymModel;
      const acronymsRoute = new AcronymRoute();
      const app = new App([acronymsRoute]);

      return request(app.getServer())
        .get(`${acronymsRoute.path}`)
        .expect(200, { data: findAcronym.slice(0, 10), message: 'findAll' });
    });
  });

  describe('[POST] /acronym', () => {
    it('response statusCode 201 / created', async () => {
      const acronymData: CreateAcronymDto = {
        acronym: '789',
        definition: '778899',
      };
      const acronymsRoute = new AcronymRoute();
      const app = new App([acronymsRoute]);

      return request(app.getServer()).post(`${acronymsRoute.path}`).send(acronymData).expect(201);
    });
  });

  describe('[PUT] /acronym/:acronym', () => {
    it('response statusCode 200 / updated', async () => {
      const acronym = 'FYI';
      const acronymData: CreateAcronymDto = {
        acronym: 'FYI',
        definition: 'For Your Information',
      };
      const acronymsRoute = new AcronymRoute();
      const app = new App([acronymsRoute]);

      return request(app.getServer()).put(`${acronymsRoute.path}/${acronym}`).send(acronymData).expect(200);
    });
  });

  describe('[DELETE] /acronym/:acronym', () => {
    it('response statusCode 200 / deleted', () => {
      const acronym = 'WTGP';
      const deleteAcronym: Acronym[] = acronymModel.filter(acronymItem => acronymItem.acronym !== acronym);
      const acronymsRoute = new AcronymRoute();
      const app = new App([acronymsRoute]);

      return request(app.getServer()).delete(`${acronymsRoute.path}/${acronym}`).expect(200, { data: deleteAcronym, message: 'deleted' });
    });
  });
});
