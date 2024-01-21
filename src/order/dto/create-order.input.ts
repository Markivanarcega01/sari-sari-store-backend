import { Field, InputType, Int } from "@nestjs/graphql";
import { ItemInput } from "src/item/dto/create-item.input";
import { UserInput } from "src/user/dto/create-user.input";

@InputType()
export class OrderInput{

    @Field(type => Int)
    buyerId:number

    @Field(type => Int)
    itemId:number

    @Field(type => Int)
    order_quantity:number
}