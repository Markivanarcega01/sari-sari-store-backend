import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { ItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';


@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>
    ) { }

    async getAll(): Promise<Item[]> {
        return await this.itemRepository.find()
    }

    async getItemById(id: number): Promise<Item> {
        return await this.itemRepository.findOneOrFail({
            where: {
                item_id: id
            }
        })
    }

    async createItem(itemInput: ItemInput): Promise<Item> {
        const newItem = this.itemRepository.create(itemInput)

        return await this.itemRepository.save(newItem)
    }

    async updateItem(itemId: number, updateItemInput: UpdateItemInput): Promise<Item> {
        await this.itemRepository.update(itemId, updateItemInput)

        return this.itemRepository.findOne({
            where: {
                item_id: itemId
            }
        })
    }

    async updateItemQuantity(itemId:number, updateItemQuantity:number): Promise<Item>{
        await this.itemRepository.update(itemId,{
            quantity:updateItemQuantity
        })

        return this.itemRepository.findOneByOrFail({item_id:itemId})
    }

    async deleteItem(itemId: number): Promise<Item> {
        const deletedItem = await this.itemRepository.findOne({
            where: {
                item_id: itemId
            }
        })
        await this.itemRepository.delete(itemId)
        return deletedItem
    }
}
