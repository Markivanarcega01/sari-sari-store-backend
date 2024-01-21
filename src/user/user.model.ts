import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/order/order.model';

@ObjectType()
export class User{

    @Field(type => Int)
    user_id:number

    @Field()
    username:string

    @Field()
    name?:string

    @Field()
    password:string

    @Field()
    position:'admin' | 'customer'

    @Field(type => [Order])
    orders?: [Order]

}