import fs from 'fs';
import { CreateAcronymDto } from '@dtos/acronyms.dto';
import { HttpException } from '@exceptions/HttpException';
import { Acronym } from '@interfaces/acronyms.interface';
import acronymModel from '@models/acronyms.model';
import { isEmpty } from '@utils/util';

class AcronymService {
  public acronyms = acronymModel;

  public async findAllAcronym(params: any): Promise<Acronym[]> {
    const { from = 0, limit = 10, search = '' } = params;
    const acronyms: Acronym[] = this.acronyms
      .filter(acronym => acronym.acronym.indexOf(search) !== -1 || acronym.definition.indexOf(search) !== -1)
      .slice(from, parseInt(from) + parseInt(limit));
    return acronyms;
  }

  private async updateJsonFile(): Promise<void> {
    fs.writeFileSync(
      'acronym.json',
      JSON.stringify(
        this.acronyms.map((acronym: Acronym) => ({
          [acronym.acronym]: acronym.definition,
        })),
      ),
    );
  }

  public async createAcronym(acronymData: CreateAcronymDto): Promise<Acronym> {
    if (isEmpty(acronymData)) throw new HttpException(400, 'acronymData is empty');

    const findAcronym: Acronym = this.acronyms.find(acronym => acronym.acronym === acronymData.acronym);
    if (findAcronym) throw new HttpException(409, `This acronym ${acronymData.acronym} already exists`);

    const createAcronymData: Acronym = acronymData;
    this.acronyms = [...this.acronyms, createAcronymData];

    this.updateJsonFile();

    return createAcronymData;
  }

  public async updateAcronym(acronym: string, acronymData: CreateAcronymDto): Promise<Acronym[]> {
    if (isEmpty(acronymData)) throw new HttpException(400, 'acronymData is empty');

    const findAcronym: Acronym = this.acronyms.find(acronymItem => acronymItem.acronym === acronym);
    if (!findAcronym) throw new HttpException(409, "Acronym doesn't exist");

    console.log(acronymData);

    const updateAcronymData: Acronym[] = this.acronyms.map((acronymItem: Acronym) => {
      if (acronymItem.acronym === findAcronym.acronym) acronymItem.definition = acronymData.definition;
      return acronymItem;
    });

    this.updateJsonFile();

    return updateAcronymData;
  }

  public async deleteAcronym(acronym: string): Promise<Acronym[]> {
    const findAcronym: Acronym = this.acronyms.find((acronymItem: Acronym) => acronymItem.acronym === acronym);
    if (!findAcronym) throw new HttpException(409, "Acronym doesn't exist");

    const deleteAcronymData: Acronym[] = this.acronyms.filter((acronymItem: Acronym) => acronymItem.acronym !== findAcronym.acronym);
    this.acronyms = deleteAcronymData;

    this.updateJsonFile();

    return deleteAcronymData;
  }
}

export default AcronymService;
