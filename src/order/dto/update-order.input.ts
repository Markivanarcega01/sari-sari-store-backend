import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateOrderInput{

    @Field(type => Int)
    buyerId:number

    @Field(type => Int)
    itemId:number

    @Field(type => Int)
    order_quantity:number

}