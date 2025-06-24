import { IsBoolean, IsString } from "class-validator";
import { Transform } from 'class-transformer';

export class CreateTareaDto { 
    //permiten mandar data al servicio
    
    @IsString()
    readonly title: string;
    //solo lectura

    @IsBoolean()
    @Transform(({ value }) => {
        if (value === undefined) return undefined; 
        if (value === 'true' || value === true) return true;
        if (value === 'false' || value === false) return false;
        return value;
    })
    readonly completed: boolean
}