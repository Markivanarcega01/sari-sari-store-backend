import { Field, InputType, Int } from "@nestjs/graphql";


@InputType()
export class UpdateItemInput{

    @Field({nullable:true})
    name:string

    @Field({nullable:true})
    description:string

    @Field({nullable:true})
    price:number

    @Field(type => Int,{nullable:true})
    quantity:number

}