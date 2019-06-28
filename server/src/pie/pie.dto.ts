import { IsNotEmpty, MinLength, MaxLength, IsOptional, Min } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

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
    @Transform(id => parseInt(id))
    @Min(0)
    price: number;

    photosPath: string[];
}