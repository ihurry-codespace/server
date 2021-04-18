import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { EntityUpdateControl } from './EntityUpdateControl'

@Entity()
export class BusinessOwner extends EntityUpdateControl {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @Column()
  public business_id!: string

  @Column()
  public user_id!: string
}
