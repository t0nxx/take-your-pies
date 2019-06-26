import { Controller, Get, Body, Param, ParseIntPipe, Post, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiImplicitParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { UserUpdateDto } from './user.update.dto';

@ApiUseTags('users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @ApiImplicitParam({ name: 'id', type: Number })
    @Get('/:id')
    async getOneUser(@Param('id', new ParseIntPipe()) id) {
        return this.userService.getOneUser(id);
    }

    @Post('/new')
    async createNewUser(@Body() userDto: UserDto) {
        return this.userService.createNewUser(userDto);
    }

    @ApiImplicitParam({ name: 'id', type: Number })
    @Put('/update/:id')
    async updateUser(
        @Param('id', new ParseIntPipe()) id,
        @Body() updateUserDto: UserUpdateDto
    ) {
        return await this.userService.updateUser(id, updateUserDto);
    }

    @Delete('/delete/:id')
    @ApiImplicitParam({ name: 'id' })
    async deletPie(@Param('id', new ParseIntPipe()) id) {
        return this.userService.deletUser(id);
    }

}
