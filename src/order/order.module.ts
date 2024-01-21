import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderResolver } from './order.resolver';
import { Item } from 'src/item/item.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { ItemService } from 'src/item/item.service';

@Module({
  imports:[
    // TypeOrmModule.forFeature([Order,Item,User])
  ],
  // providers: [OrderService,OrderResolver,UserService,ItemService]
})
export class OrderModule {}
