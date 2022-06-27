import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as DayJS from 'dayjs';

@Entity()
export class GroupMessage {
  @PrimaryGeneratedColumn()
  _id:number

  @Column()
  userId:string

  @Column()
  groupId:string

  @Column()
  content:string

  @Column()
  messageType: string;

  @Column({default: DayJS().format('YYYY-MM-DD HH:mm:ss')})
  time:Date
}