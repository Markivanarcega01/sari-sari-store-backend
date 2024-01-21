import { Item } from "src/item/item.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order{ // Lahat ng may Column() decorator meron siyang counterpart sa model na Field()

    @PrimaryGeneratedColumn()
    order_id:number

    @ManyToOne(()=> User, (user)=> user.orders)
    @JoinColumn({name:'buyer_id'})
    buyer_id:User

    @ManyToOne(()=> Item, (item)=> item.orders)
    @JoinColumn({name:'item_id'})
    item_id:Item

    @Column({name:'buyer_id'})
    buyerId: number

    @Column({name:'item_id'})
    itemId: number

    @Column()
    order_quantity:number

    @Column({default:'to pay'})
    status:string

    @Column()
    total_price:number
}