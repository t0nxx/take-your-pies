import { IsNotEmpty, MinLength, MaxLength, IsOptional, Min } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class PieDto {

    @ApiModelProperty()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    name: string;

    @ApiModelProperty()
    @IsOptional()
    description: string;

    @ApiModelProperty()
    @Min(0)
    price: number;
}