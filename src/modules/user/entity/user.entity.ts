import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as DayJS from 'dayjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId:string;

  @Column()
  username:string;

  @Column()
  password:string;

  @Column({default: null})
  avatar:string;

  @Column({default: null})
  tag:string;

  @Column({ default: '0' })
  online:string

  @Column({default: null})
  roleId:string;

  @Column({default:DayJS().format('YYYY-MM-DD HH:mm:ss')})
  createTime: Date;

}