import { Order } from "src/order/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item{

    @PrimaryGeneratedColumn()
    item_id:number

    @Column()
    name:string

    @Column()
    description:string

    @Column()
    price:number

    @Column()
    quantity:number

    @OneToMany(()=>Order, (order)=> order.item_id)
    orders: [Order]
}