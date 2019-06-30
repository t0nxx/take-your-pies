import { Controller, Get, Post, Put, Delete, Body, Query, Param, ParseIntPipe } from '@nestjs/common';
import { ApiImplicitParam, ApiImplicitHeader, ApiUseTags } from '@nestjs/swagger';
import { User } from '../user/user.decorator';
import { OrderService } from './order.service';
import { Pie } from 'src/pie/pie.entity';
import { PaginationDto } from '../shared/pagination.filter';

@ApiUseTags('orders')
@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Get()
    async getAllOrders(@Query() query: PaginationDto) {
        return this.orderService.getAllorders(query);
    }

    @ApiImplicitParam({ name: 'id'})
    @Get('/:id')
    async getOneOrder(
        @Param('id', new ParseIntPipe()) id
    ) {
        return this.orderService.getOneOrder(id);
    }


    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Get('/myOrders')
    async getMyOrders(
        @User('id') id,
        @Query() query: PaginationDto
    ) {
        return this.orderService.getMyOrders(id, query);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Post('/newOrder')
    async createNewUser(
        @User() user,
        @Body() pie: Pie[],
    ) {
        // const user = new User();
        // user.name= 'hhhhhh' ; user.email='hh@hh.com' ; user.password = '123456';
        // user.number='11111111111';
        return this.orderService.createNeworder(user, pie);
    }

    // @ApiImplicitParam({ name: 'id', type: Number })
    // @ApiImplicitHeader({ name: 'authorization', required: true })
    // @Put('/update/order')
    // async updateUser(
    //     @User('id') id,
    //     @Body() updateUserDto: UserUpdateDto,
    // ) {
    //     return await this.userService.updateUser(id, updateUserDto);
    // }

    // @ApiImplicitHeader({ name: 'authorization', required: true })
    // @Delete('/delete/order')
    // @ApiImplicitParam({ name: 'id' })
    // async deletPie(@User('id') id) {
    //     return this.userService.deletUser(id);
    // }
}
