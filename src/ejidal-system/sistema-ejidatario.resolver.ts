import {Query, Resolver} from '@nestjs/graphql';

@Resolver()
export class SistemaResolver {
  @Query(() => String, {description: "Sistema", name: "SGE"})
  helloWorld(): string {
    return "Hello World";
  }
}
