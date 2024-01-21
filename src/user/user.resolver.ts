import { User } from "./user.model";
import { UserService } from "./user.service";
import { UserInput } from "./dto/create-user.input";
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Order } from "src/order/order.model";
import { OrderService } from "src/order/order.service";
import { UpdateUserInput } from "./dto/update-user.input";

@Resolver(() => User)
export class UserResolver{
    constructor(private userService:UserService,private orderService:OrderService){}
    

    @Query((returns) => [User])
    async getAllUsers(){
        return this.userService.getAll()
    }

    @Query(returns => User)
    async getUserById(@Args('userId',{type:()=> Int}) userId:number){
        return this.userService.getUserById(userId)
    }

    @Query(returns => User)
    async loginUser(@Args('username') username:string, @Args('password') password:string):Promise<User>{
        return this.userService.loginUser(username,password)
    }

    @ResolveField('orders', returns => [Order]) // etong resolvefield "orders" is dapat pareho ng name na nasa user.model.ts
    async getOrders(@Parent() user:User){
        const {user_id} = user
        return this.orderService.getOrdersByUserId(user_id)
    }

    @Mutation((returns) => User)
    async createUser(@Args('userInput') userInput:UserInput):Promise<User>{
        return this.userService.createUser(userInput)
    }

    @Mutation(returns => User)
    async updateUser(@Args('userId',{type:()=> Int}) userId:number,@Args('updateInput') updateUserInput:UpdateUserInput):Promise<User>{
        return this.userService.updateUser(userId,updateUserInput)
    }

    @Mutation(returns => User)
    async deleteUser(@Args('userId') userId:number): Promise<User>{
        return this.userService.deleteUser(userId)
    }
}