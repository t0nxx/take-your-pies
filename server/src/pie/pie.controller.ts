import { Controller, Post, Get, Body, Put, Param, ParseIntPipe, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PieService } from './pie.service';
import { PieDto } from './pie.dto';
import { ApiUseTags, ApiImplicitParam, ApiConsumes, ApiImplicitFile, ApiImplicitBody } from '@nestjs/swagger';
import { PieUpdateDto } from './pie.update.dto';
import { QueryDto } from 'src/shared/query.filter';

@ApiUseTags('pie')
@Controller('pie')
export class PieController {
    constructor(private pieService: PieService) { }

    @Get()
    async getAllPies(@Query() query: QueryDto) {
        return await this.pieService.getAllPies(query);
    }

    @Get('/:id')
    @ApiImplicitParam({ name: 'id' })
    async getOnePie(@Param('id', new ParseIntPipe()) id) {
        return await this.pieService.getOnePie(id);
    }

    @Post('/new')
    @UseInterceptors(FileInterceptor('file'))
    //@ApiConsumes('multipart/form-data')
    //@ApiImplicitFile({ name: 'file', required: true })
    //@ApiImplicitBody({name : 'name' , type :PieDto})
    async createNewPie(
        @Body() newPie: PieDto,
        @UploadedFile('file') file
    ) {
        // thier is a problem with [Object: null prototype]
        // it's body barser issue 
        // solve
        newPie = JSON.parse(JSON.stringify(newPie));
        newPie.photoPath = file.filename;
        return await this.pieService.creatNewPie(newPie);
    }

    @Put('/update/:id')
    @ApiImplicitParam({ name: 'id' })
    async updatePie(
        @Param('id', new ParseIntPipe()) id,
        @Body() updatePie: PieUpdateDto) {
        return this.pieService.updatePie(id, updatePie);
    }

    @Delete('/delete/:id')
    @ApiImplicitParam({ name: 'id' })
    async deletPie(@Param('id', new ParseIntPipe()) id) {
        return this.pieService.deletPie(id);
    }

}
