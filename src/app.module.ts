import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLDate } from 'graphql-scalars';
import { SistemaEjidatarioModule } from './ejidal-system/sistema-ejidatario.module';
// Asegúrate de que esta ruta sea correcta según donde guardaste tu AuthModule
import { AuthModule } from './modules/auth/auth.module'; 

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        scalarsMap: [{ type: Date, scalar: GraphQLDate }],
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',  
      host: 'localhost', 
      port: 3306, 
      username: 'juanmecanico', 
      password: '123', 
      database: 'patito',  
      synchronize: true,
      autoLoadEntities: true,
    }),
    SistemaEjidatarioModule,
    
    // ✨ AQUÍ ESTABA EL DETALLE: Faltaba registrar el AuthModule aquí ✨
    AuthModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}