import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'
import { BusinessOwner } from '.'
import { EntityUpdateControl } from './EntityUpdateControl'

@Entity()
export class Business extends EntityUpdateControl {
  @PrimaryColumn()
  public id!: string

  @Column()
  public name!: string

  @Column()
  public description!: string

  @Column({ nullable: true })
  public avatar!: string

  @OneToMany(type => BusinessOwner, business => Business)
  public businessOwners!: BusinessOwner[]
}
