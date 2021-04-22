import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm'
import { Business } from './Business'
import { EntityUpdateControl } from './EntityUpdateControl'
import { User, UserStatus } from './User'

/**
 * Enum user roles
 * @readonly
 * @enum {string}
 */
export enum BusinessOwnerRole {
  /**
   * This user can create and update the company's profile to accept new analysts, register interview flows, vacancies and enrolling candidate for vacancy, approving and reproving candidate sending a message to candidate.
   */
  ADMIN = 'admin',
  /**
   * Registering interview flows, vacancies and enrolling candidate for vacancy, approve and reprove candidate Send a message to candidate.
   */
  ANALYST = 'analyst',
}

@Entity()
export class BusinessOwner extends EntityUpdateControl {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @ManyToOne(type => Business, businesses => Business)
  public business!: string

  @OneToOne(type => User, businessOwner => BusinessOwner)
  @JoinColumn()
  user!: User

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
