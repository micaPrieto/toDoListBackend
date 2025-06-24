import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";
import { Transform } from 'class-transformer';

export class UpdateTareaDto { 
    
    @IsString()
    @IsUUID()
    @IsOptional() // Puede veni o no
    readonly id?: string;


    @IsString()
    @IsOptional()
    readonly title?: string;

    @IsBoolean()
    @IsOptional()
     @Transform(({ value }) => {
        if (value === undefined) return undefined; 
        if (value === 'true' || value === true) return true;
        if (value === 'false' || value === false) return false;
        return value;
    })
    readonly completed?: boolean
}