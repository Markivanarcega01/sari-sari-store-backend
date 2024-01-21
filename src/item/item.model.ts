import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class Item{

    @Field(type =>Int)
    item_id:number

    @Field()
    name:string

    @Field()
    description:string

    @Field()
    price:number

    @Field(type => Int)
    quantity:number

}