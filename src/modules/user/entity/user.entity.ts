import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as DayJS from 'dayjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId:string;

  @Column()
  username:string;

  @Column({ select: false })
  password:string;

  @Column({default: null})
  avatar:string;

  @Column({default: null})
  tag:string;

  @Column({ default: '0' })
  online:string

  @Column({default: null})
  roleId:string;

  @Column({type: 'double',default: new Date().valueOf()})
  createTime: number;

}