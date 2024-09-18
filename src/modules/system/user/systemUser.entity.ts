import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sys_user')
export class SystemUserEntity {
  @PrimaryGeneratedColumn({ name: 'userid' })
  userId: number;

  @Column({ type: 'varchar', length: 16 })
  username: string;

  @Column({ type: 'varchar', length: 60 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  avatar: string;

  @Column({ type: 'varchar', length: 16, name: 'nikename' })
  nikeName: string;

  @Column({ type: 'varchar', length: 11 })
  mobile: string;

  @Column({ type: 'varchar', length: 32, name: 'email' })
  eMali: string;

  @Column({ type: 'int', default: 0 })
  sex: number;

  @Column({ type: 'int' })
  dept: number;

  @Column({ type: 'int' })
  job: number;

  @Column({ type: 'int' })
  post: number;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ type: 'varchar', length: 50 })
  remark: string;

  @Column({ type: 'timestamp', name: 'create_time' })
  createTime: string;

  @Column({ type: 'timestamp', name: 'update_time' })
  updateTime: string;
}
