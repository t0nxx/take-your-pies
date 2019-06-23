import { Injectable, HttpException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { Pie } from './pie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PieDto } from './pie.dto';
import { PieUpdateDto } from './pie.update.dto';

@Injectable()
export class PieService {
    constructor(
        @InjectRepository(Pie)
        private readonly pieRepository: Repository<Pie>,
    ) { }

    /* get all pies */
    async getAllPies(): Promise<any> {
        const [data, count] = await this.pieRepository.findAndCount();
        return { data, count };
    }

    /* add new pie */
    async creatNewPie(newPie: PieDto): Promise<Pie> {
        return await this.pieRepository.save(newPie);
    }

    /* update pie */
    async updatePie(id: number, updatePie: PieUpdateDto): Promise<any> {
        const findOne = await this.pieRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        if (Object.keys(updatePie).length <= 0) {
            throw new BadRequestException('no data provided');
        }
        /// i did this here bcz typeorm not returning the updated row
        await this.pieRepository.update(id, updatePie);
        const updated = await this.pieRepository.findOne(id);
        return updated;
    }

    /* delete pie */
    async deletPie(id: number): Promise<any> {
        const findOne = await this.pieRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        await this.pieRepository.delete(id);
        return 'done . pie deleted';
    }

}
