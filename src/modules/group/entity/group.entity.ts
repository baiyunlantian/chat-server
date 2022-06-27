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

  @Column()
  notice:string

  @Column({default: DayJS().format('YYYY-MM-DD HH:mm:ss')})
  createTime:Date
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