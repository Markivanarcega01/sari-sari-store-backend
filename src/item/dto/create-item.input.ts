import { Field, InputType, Int } from "@nestjs/graphql";


@InputType()
export class ItemInput{

    @Field()
    name:string

    @Field()
    description:string

    @Field()
    price:number

    @Field(type => Int)
    quantity:number

}