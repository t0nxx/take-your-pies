import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';
export class PaginationDto {

    @ApiModelPropertyOptional()
    @Transform(id => parseInt(id))
    @IsOptional()
    limit: number;

    @ApiModelPropertyOptional()
    @Transform(id => parseInt(id))
    @IsOptional()
    page: number;

}
