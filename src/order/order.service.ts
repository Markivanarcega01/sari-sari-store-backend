import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { OrderInput } from './dto/create-order.input';
import { Item } from 'src/item/item.entity';
import { UpdateOrderInput } from './dto/update-order.input';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(Item)
        private itemRepository: Repository<Item>
    ) { }

    async getAll(): Promise<Order[]> {
        return this.orderRepository.find()
    }

    async getOrdersByUserId(user_id: number): Promise<Order[]> {
        return this.orderRepository.find({
            where: {
                buyerId: user_id
            }
        })
    }

    async createOrder(orderInput: OrderInput): Promise<Order> {
        let itemPrice = this.itemRepository.findOneOrFail({
            where: {
                item_id: orderInput.itemId
            }
        })
        const newOrder = this.orderRepository.create({
            ...orderInput,
            total_price: (await itemPrice).price * orderInput.order_quantity
        })

        return this.orderRepository.save(newOrder)
    }

    async updateOrder(orderId: number, updateOrderInput: UpdateOrderInput): Promise<Order> {
        let newItemPrice = await this.itemRepository.findOneOrFail({
            where: {
                item_id: updateOrderInput.itemId
            }
        })
        await this.orderRepository.update(orderId, {
            ...updateOrderInput,
            total_price: newItemPrice.price * updateOrderInput.order_quantity
        })
        return this.orderRepository.findOneOrFail({
            where: {
                order_id: orderId
            }
        })
    }

    async updateStatusOrder(orderId : number, updateStatusOrderInput:string): Promise<Order>{
        await this.orderRepository.update(orderId,{
            status:updateStatusOrderInput
        })

        return this.orderRepository.findOneOrFail({
            where:{
                order_id:orderId
            }
        })
    }

    async deleteOrder(orderId: number): Promise<Order> {
        let deletedOrder = this.orderRepository.findOneOrFail({
            where: {
                order_id:orderId
            }
        })
        await this.orderRepository.delete(orderId)
        return deletedOrder
    }
}
