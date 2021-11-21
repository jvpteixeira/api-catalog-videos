import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {rabbitmqSubscribe} from '../decorators/rabbitmq-subscribe.decorator';
import {CategoryRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class CategorySyncService {
  constructor(
    @repository(CategoryRepository) private categoryRepo: CategoryRepository
  ) {}


  @rabbitmqSubscribe({
      exchange: 'amq.topic',
      queue: 'x',
      routingKey: 'model.category.*'
  })
  handler1(){
    console.log(this.categoryRepo.entityClass, 'handler1')
  }

  @rabbitmqSubscribe({
    exchange: 'amq.topic',
    queue: 'x1',
    routingKey: 'model.category1.*'
  })
  handler2(){
    console.log(this.categoryRepo.entityClass, 'handler2')
  }
}
