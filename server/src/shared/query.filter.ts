import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsOptional, Min } from "class-validator";
import { Transform } from 'class-transformer';
export class QueryDto {

    @ApiModelPropertyOptional()
    @Transform(id => parseInt(id))
    @IsOptional()
    limit: number;

    @ApiModelPropertyOptional()
    @Transform(id => parseInt(id))
    @IsOptional()
    page: number;

    @ApiModelPropertyOptional()
    @Transform(id => parseInt(id))
    @IsOptional()
    @Min(0)
    priceFrom: number;

    @ApiModelPropertyOptional()
    @Transform(id => parseInt(id))
    @IsOptional()
    @Min(0)
    priceTo: number;



}