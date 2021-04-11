import { Entity, Column, PrimaryColumn } from 'typeorm'
import { EntityUpdateControl } from './EntityUpdateControl'

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BLOCKED = 'blocked',
  DELETED = 'deleted',
  NEWREG = 'newreg',
}

@Entity()
export class User extends EntityUpdateControl {
  @PrimaryColumn()
  public id!: string

  @Column()
  public name!: string

  @Column()
  public password!: string

  @Column()
  public email!: string

  @Column({ nullable: true })
  public avatar!: string

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE
  })
  public status!: string
}
