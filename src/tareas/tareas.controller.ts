import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea-dto';

@Controller('tareas')
export class TareasController {

    constructor(
        private readonly tareasService : TareasService
    ){}

    @Get() 
    getAllTareas(){
        return this.tareasService.getTareas();
    }

    @Post()
    //@UsePipes(ValidationPipe)
    createTarea(@Body() createTareaDto: CreateTareaDto){
        return this.tareasService.create(createTareaDto);
    }

    @Delete(':id')
    eliminarTarea(@Param('id', ParseUUIDPipe) id: string){
    //El ParseUUIDPipe lo transforma en un uuid
        return this.tareasService.delete(id);
    }

    /**/
    
    @Patch(':id')
    updateTarea(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateTareaDto: UpdateTareaDto
     ){
        return this.tareasService.update(id,updateTareaDto);
    }



/*
    @Get(':id') 
    getTareaById(@Param('id',ParseUUIDPipe) id: string){
        console.log({id});
        return this.tareasService.findOneById(id);                                 
    }
        */
}
