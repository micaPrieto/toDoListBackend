import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea-dto';
import { Tarea } from './entities/tarea.entity';

@Injectable()
export class TareasService {

   private tareas : Tarea[] = [
      {
         id: uuid(),
         title: 'limpiar',
         completed: true, 
      },
      {
         id: uuid(),
         title: 'lavar ropa',
         completed: false, 
      },
      {
         id: uuid(),
         title: 'cocinar',
         completed: false, 
      }, 
   ]
    

   getTareas(): Tarea[] {
      return this.tareas;
    }

   create(createTareaDto : CreateTareaDto) : Tarea{
      const tarea : Tarea= {
         id: uuid(),
         title: createTareaDto.title,
         completed: createTareaDto.completed,
      }

      this.tareas.push(tarea);
      
      return tarea;
    }

   delete(id: string) : Tarea[]{
      const tarea = this.findOneById(id); // Lanza una exception si no la encuentra

      return this.tareas = this.tareas.filter(tarea => tarea.id !== id)
    }

   findOneById(id: string): Tarea{
       const tarea =  this.tareas.find(tarea => tarea.id === id);  

       if(!tarea){
        throw new NotFoundException(`La tarea con el id '${id}' no se encuentra `);
       }
   
        return tarea;
    }



   update(id: string, updateTareaDto: UpdateTareaDto) : Tarea{

      let tareaDB = this.findOneById(id);

      this.tareas = this.tareas.map(tarea =>{
         if(tarea.id === id){
            tareaDB = { // Lo siguiente lo hago para no sobreescribir si el cliente no mando algun dato
               ...tareaDB, //esparzo las propiedades de la tarea como esta en la db
               ...Object.fromEntries(
                     Object.entries(updateTareaDto).filter(
                     ([_, value]) => value !== undefined)
                  ),
               id //y sostengo el id
            }
            return tareaDB; //retorno del map --> si encuentra la tarea
         }
         return tarea; //retorno del map --> si esta no es la tarea
      })

      return tareaDB; //Retorno final: Se pudo haber sobreescrito dentro del map, o mantenido tal cual estaba
      
    }



}
