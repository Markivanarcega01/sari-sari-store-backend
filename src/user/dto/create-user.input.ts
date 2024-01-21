import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UserInput{

    @Field()
    username:string

    @Field({nullable:true})
    name:string

    @Field()
    password:string

    @Field({nullable:true})
    position:'admin' | 'customer'
}