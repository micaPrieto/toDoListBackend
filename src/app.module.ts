import { Module } from '@nestjs/common';
import { TareasModule } from './tareas/tareas.module';

@Module({
  imports: [TareasModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
