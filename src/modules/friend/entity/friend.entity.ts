import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as DayJS from 'dayjs';

@Entity()
export class FriendMessage {
  @PrimaryGeneratedColumn()
  _id:number

  @Column()
  userId:string

  @Column()
  friendId:string

  @Column()
  content:string

  @Column({type: 'double',default: new Date().valueOf()})
  time:number
}

@Entity()
export class UserMap {
  @PrimaryGeneratedColumn()
  _id:number

  @Column()
  friendId:string

  @Column()
  userId:string
}