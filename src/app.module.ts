  import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLAstExplorer, GraphQLModule, } from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {join} from 'path';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GraphQLDate} from 'graphql-scalars';
import { SistemaEjidatarioModule } from './ejidal-system/sistema-ejidatario.module';
4

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
      type: 'mariadb',  //pendiente
      host: 'localhost', //pendiente
      port: 3306, //pendiente
      username: 'juanmecanico', //pendiente
      password: '123', //pendiente
      database: 'patito',  //pendiente
      synchronize: true,
      autoLoadEntities: true,
    }),
    SistemaEjidatarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
