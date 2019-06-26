import { IsAlpha, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';

export class UserUpdateDto {

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsAlpha()
    name: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @MinLength(11)
    @MaxLength(11)
    number: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @MinLength(5)
    @MaxLength(255)
    address: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @MinLength(6)
    password: string;

};

export async function hashUpdatePass(pass) {
   return await hashSync(pass, 10);
}