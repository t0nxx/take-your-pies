import { IsNotEmpty, IsAlpha, MinLength, MaxLength, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {

    @ApiModelProperty()
    @IsNotEmpty()
    @IsAlpha()
    name: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @MinLength(11)
    @MaxLength(11)
    number: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(255)
    address: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

}
