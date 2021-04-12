import { Entity, Column, PrimaryColumn } from 'typeorm'
import { EntityUpdateControl } from './EntityUpdateControl'

/**
 * Enum user statuses
 * @readonly
 * @enum {string}
 */
export enum UserStatus {
  /** The default status for new records. To log in, a user record must be active. */
  ACTIVE = 'active',

  /** Users cannot log in. Inactive user records do not appear in select value lists and cannot be associated with new records. */
  INACTIVE = 'inactive',

  /** Users cannot log in. */
  BLOCKED = 'blocked',

  /** The user was deleted but the user name has been retained. */
  DELETED = 'deleted',

  /** The default status for user records that are created using self-registration. */
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
