import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { ItemModule } from './item/item.module';
import { OrderModule } from './order/order.module';
import { Item } from './item/item.entity';
import { Order } from './order/order.entity';
import { User } from './user/user.entity';
import { OrderService } from './order/order.service';
import { OrderResolver } from './order/order.resolver';
import { UserService } from './user/user.service';
import { ItemService } from './item/item.service';
import { ItemResolver } from './item/item.resolver';
import { UserResolver } from './user/user.resolver';


@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Markivan01',
      database: 'sampledatabase',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize:true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    TypeOrmModule.forFeature([Item,Order,User]),
    UserModule,
    ItemModule,
    OrderModule,
  ],
  controllers: [],
  providers: [OrderService,OrderResolver,UserService,UserResolver,ItemService,ItemResolver],
})
export class AppModule { }
