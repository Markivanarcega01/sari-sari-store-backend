import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Item } from "./item.model";
import { ItemService } from "./item.service";
import { ItemInput } from "./dto/create-item.input";
import { UpdateItemInput } from "./dto/update-item.input";


@Resolver(()=> Item) // etong resolver katumbas neto yung controller sa REST API
export class ItemResolver{
    constructor(private itemService:ItemService){}

    @Query(returns => [Item])
    async getAllItems(){
        return this.itemService.getAll()
    }

    @Mutation(returns => Item)
    async createItem(@Args('itemInput') itemInput:ItemInput): Promise<Item>{
        return this.itemService.createItem(itemInput)
    }

    @Mutation(returns => Item)
    async updateItem(@Args('itemId',{type:()=> Int}) itemId:number, @Args('updateItemInput') updateItemInput:UpdateItemInput): Promise<Item>{
        return this.itemService.updateItem(itemId,updateItemInput)
    }

    @Mutation(returns => Item)
    async deleteItem(@Args('itemId',{type:()=> Int}) itemId:number): Promise<Item>{
        return this.itemService.deleteItem(itemId)
    }
}