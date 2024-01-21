import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput{

    @Field({nullable:true})
    username:string

    @Field({nullable:true})
    name:string

    @Field({nullable:true})
    password:string

    @Field({nullable:true})
    position:'admin' | 'customer'

}