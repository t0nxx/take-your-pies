import { Controller, Post, Get, Body, Put, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { PieService } from './pie.service';
import { PieDto } from './pie.dto';
import { ApiUseTags, ApiImplicitParam } from '@nestjs/swagger';
import { PieUpdateDto } from './pie.update.dto';

@ApiUseTags('pie')
@Controller('pie')
export class PieController {
    constructor(private pieService: PieService) { }

    @Get()
    async getAllPies() {
        return await this.pieService.getAllPies();
    }

    @Post('/new')
    async createNewPie(@Body() newPie: PieDto) {
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
