import { UserStatus, UserRole } from '@data/use-cases/interfaces'
import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm'
import { BusinessOwner } from '.'
import { EntityUpdateControl } from './EntityUpdateControl'

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

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CANDIDATE
  })
  role!: UserRole

  @OneToOne(type => BusinessOwner, user => User)
  businessOwner!: BusinessOwner
}
