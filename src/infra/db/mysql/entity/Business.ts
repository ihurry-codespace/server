import { Entity, Column, PrimaryColumn } from 'typeorm'
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
}
