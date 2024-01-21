import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserInput } from './dto/create-user.input';
import { Order } from 'src/order/order.entity';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
    ) { }

    async getAll(): Promise<User[]>{
        return await this.userRepository.find()
    }

    async getUserById(id:number): Promise<User>{
        return await this.userRepository.findOne({
            where:{
                user_id:id
            }
        })
    }

    async loginUser(username:string,password:string) : Promise<User>{
        return await this.userRepository.findOneOrFail({
            where:{
                username:username,
                password:password
            }
        })
    }

    async createUser(userInput:UserInput): Promise<User>{
        const newUser = this.userRepository.create(userInput)
        
        return await this.userRepository.save(newUser)
    }

    async updateUser(id:number, updateUserInput:UpdateUserInput): Promise<User>{
        await this.userRepository.update(id,updateUserInput)

        return this.userRepository.findOne({
            where:{
                user_id:id
            }
        })
    }

    async deleteUser(id:number): Promise<User>{
        const deletedUser = this.userRepository.findOne({
            where:{
                user_id:id
            }
        })
            await this.userRepository.delete(id)
        return deletedUser
    }
}
