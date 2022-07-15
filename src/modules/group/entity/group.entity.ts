import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as DayJS from 'dayjs';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  groupId:string

  @Column()
  userId:string

  @Column()
  groupName:string

  @Column({ default: 0 })
  notice:number

  @Column({type: 'double',default: new Date().valueOf()})
  createTime: number;
}

@Entity()
export class GroupMap {
  @PrimaryGeneratedColumn()
  _id:number

  @Column()
  userId:string

  @Column()
  groupId:string
}