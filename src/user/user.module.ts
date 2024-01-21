import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { Order } from 'src/order/order.entity';
import { OrderService } from 'src/order/order.service';
import { Item } from 'src/item/item.entity';


@Module({
    imports: [
        //TypeOrmModule.forFeature([User,Order,Item]),
    ],
    controllers: [],
    //providers: [UserService,UserResolver,OrderService],
})
export class UserModule { }
