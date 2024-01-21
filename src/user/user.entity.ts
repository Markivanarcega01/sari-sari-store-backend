import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from 'src/order/order.entity';

//This file a combination of Entity and Model
// this could be user.entity.ts and user.model.ts

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    user_id:number

    @Column()
    username:string

    @Column({default:''})
    name:string

    @Column()
    password:string

    @Column({default:''})
    position:'admin' | 'customer'

    @OneToMany(()=>Order, (order)=> order.buyer_id)
    orders: [Order]

}