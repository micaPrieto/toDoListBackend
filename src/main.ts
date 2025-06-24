import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.useGlobalPipes(
     new ValidationPipe({
       whitelist: true,
      //  Remueve los datos que van de más en el body de la request
      // Y unicamente envía lo que se ha especificado en el DTO

       forbidNonWhitelisted: true,
      //  Si hay datos de más en el body de la request tira un error
      // Indicando que la propiedad no debería de existir

      transform: true, // Permite el transform a boolean

       transformOptions: {//  Excluye los campos undefined
        exposeUnsetFields: false
      },
     
    }),

   )
  app.enableCors(); //! Esto es clave para que Angular pueda conectarse (OpenIA)
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
