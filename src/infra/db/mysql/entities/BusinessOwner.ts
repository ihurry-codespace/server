import { BusinessOwnerRole, UserStatus } from '@data/use-cases/interfaces'
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { Business } from './Business'
import { EntityUpdateControl } from './EntityUpdateControl'
import { Job } from './Job'
import { User } from './User'

@Entity()
export class BusinessOwner extends EntityUpdateControl {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @ManyToOne(type => Business, businesses => Business)
  @JoinColumn({ name: 'business_id' })
  public business!: string

  @OneToOne(type => User, businessOwner => BusinessOwner)
  @JoinColumn({ name: 'user_id' })
  user!: User

  @OneToMany(type => Job, jobs => Job)
  job!: Job[]

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE
  })
  public status!: string

  @Column({
    type: 'enum',
    enum: BusinessOwnerRole,
    default: BusinessOwnerRole.ANALYST
  })
  public role!: string
}
