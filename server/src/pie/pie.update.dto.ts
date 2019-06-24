import { MinLength, MaxLength, IsOptional, Min } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class PieUpdateDto {

    @ApiModelPropertyOptional()
    @IsOptional()
    @MinLength(5)
    @MaxLength(50)
    name: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    description: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @Min(0)
    price: number;
}
