
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import { Job } from '.'
import { EntityUpdateControl } from './EntityUpdateControl'

@Entity()
export class Flow extends EntityUpdateControl {
  @PrimaryGeneratedColumn('increment')
  public id!: string

  @Column()
  public quantity!: number

  @Column({
    default: true
  })
  public is_private!: boolean

  @Column()
  public external_document_id!: string

  @OneToOne(type => Job, jobs => Job)
  job!: Job
}
