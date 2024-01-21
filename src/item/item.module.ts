import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { ItemResolver } from './item.resolver';

@Module({
  imports:[
    // TypeOrmModule.forFeature([Item])
  ],
  providers: []
})
export class ItemModule {}
//ItemService,ItemResolver
