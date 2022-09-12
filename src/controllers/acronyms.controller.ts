import { NextFunction, Request, Response } from 'express';
import { CreateAcronymDto } from '@dtos/acronyms.dto';
import { Acronym } from '@interfaces/acronyms.interface';
import acronymService from '@services/acronyms.service';

class AcronymsController {
  public acronymService = new acronymService();

  public getAcronyms = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllAcronymsData: Acronym[] = await this.acronymService.findAllAcronym(req.query);

      res.status(200).json({ data: findAllAcronymsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createAcronym = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const acronymData: CreateAcronymDto = req.body;
      const createAcronymData: Acronym = await this.acronymService.createAcronym(acronymData);

      res.status(201).json({ data: createAcronymData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateAcronym = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const acronym = req.params.acronym;
      const acronymData: CreateAcronymDto = req.body;
      const updateAcronymData: Acronym[] = await this.acronymService.updateAcronym(acronym, acronymData);

      res.status(200).json({ data: updateAcronymData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAcronym = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const acronym = req.params.acronym;
      const deleteAcronymData: Acronym[] = await this.acronymService.deleteAcronym(acronym);

      res.status(200).json({ data: deleteAcronymData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default AcronymsController;
