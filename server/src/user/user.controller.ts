import { Controller, Get, Body, Param, ParseIntPipe, Post, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiImplicitParam, ApiImplicitHeaders, ApiImplicitHeader } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { UserUpdateDto } from './user.update.dto';
import { User } from './user.decorator';

@ApiUseTags('users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    // @ApiImplicitParam({ name: 'id', type: Number })
    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Get('/me')
    async getOneUser(@User('id') id) {
        return this.userService.getOneUser(id);
    }

    @Post('/new')
    async createNewUser(@Body() userDto: UserDto) {
        return this.userService.createNewUser(userDto);
    }

    // @ApiImplicitParam({ name: 'id', type: Number })
    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Put('/update/me')
    async updateUser(
        @User('id') id,
        @Body() updateUserDto: UserUpdateDto,
    ) {
        return await this.userService.updateUser(id, updateUserDto);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Delete('/delete/me')
    @ApiImplicitParam({ name: 'id' })
    async deletPie(@User('id') id) {
        return this.userService.deletUser(id);
    }

}
