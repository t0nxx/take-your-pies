import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CategoryDto {

    @ApiModelProperty()
    @IsNotEmpty()
    name: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @Transform(id => parseInt(id))
    parentId: number;
}
