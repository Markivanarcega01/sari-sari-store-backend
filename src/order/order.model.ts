import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Item } from "src/item/item.model";
import { User } from "src/user/user.model";


@ObjectType() // Related ang Model sa Entity... TypeOrm Graphql
export class Order{

    @Field(type =>Int)
    order_id:number

    // @Field(type => Int)
    // buyer_id:User

    @Field(type => Int)
    buyerId:number

    // @Field(type => Item)
    // item_id:Item

    @Field(type => Int)
    itemId:number

    @Field(type => Int)
    order_quantity:number

    @Field()
    status:string

    @Field(type => Int)
    total_price:number

}