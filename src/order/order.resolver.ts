import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { OrderService } from "./order.service";
import { Order } from "./order.model";
import { OrderInput } from "./dto/create-order.input";
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.model";
import { Item } from "src/item/item.model";
import { ItemService } from "src/item/item.service";
import { UpdateOrderInput } from "./dto/update-order.input";

@Resolver(() => Order) // parent ng resolvefield() and yung arguments sa loob is yung reference model para maaccess yung mga fields
export class OrderResolver {
    constructor(private orderService: OrderService, private userService: UserService,
        private itemService: ItemService) { }

    @Query(returns => [Order])
    async getAllOrders() {
        return this.orderService.getAll()
    }

    @Query(returns => [Order])
    async getOrdersByUserId(@Args('userId', { type: () => Int }) userId: number): Promise<Order[]> {
        return this.orderService.getOrdersByUserId(userId)
    }

    @ResolveField('buyerId', returns => User)
    async getOrderDetailsByUserId(@Parent() order: Order) {
        const { buyerId } = order
        return this.userService.getUserById(buyerId)
    }

    @ResolveField('itemId', returns => Item)
    async getOrderDetailsByItemId(@Parent() order: Order) {
        const { itemId } = order
        return this.itemService.getItemById(itemId)
    }

    @Mutation(returns => Order)
    async createOrder(@Args('orderInput') orderInput: OrderInput): Promise<Order> {
        // subtracts the order quantity to the current quantity of the item
        let itemQuantity = await this.itemService.getItemById(orderInput.itemId)
        let remainingItemQuantity = itemQuantity.quantity - orderInput.order_quantity
        await this.itemService.updateItemQuantity(orderInput.itemId,remainingItemQuantity)
        // returns the created order
        return this.orderService.createOrder(orderInput)
    }

    @Mutation(returns => Order)
    async updateOrder(@Args('orderId', { type: () => Int }) orderId: number, @Args('updateInput') updateOrderInput: UpdateOrderInput): Promise<Order> {
        return this.orderService.updateOrder(orderId, updateOrderInput)
    }

    @Mutation(returns => Order)
    async updateOrderStatus(@Args('orderId', { type: () => Int }) orderId: number, @Args('orderStatus') orderStatus: string):Promise<Order> {
        return this.orderService.updateStatusOrder(orderId,orderStatus)
    }

    @Mutation(returns => Order)
    async deleteOrder(@Args('orderId', { type: () => Int }) orderId: number): Promise<Order> {
        return this.orderService.deleteOrder(orderId)
    }

}