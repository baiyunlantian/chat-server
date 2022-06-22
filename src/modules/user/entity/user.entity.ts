import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId:string;

  @Column()
  username:string;

  @Column()
  password:string;

  @Column()
  avatar:string;

  @Column()
  tag:string;

  @Column({default:'off'})
  status:string

  @Column()
  role:string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
  })
  createTime: Date;

}