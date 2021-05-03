
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import { Job } from './Job'
import { EntityUpdateControl } from './EntityUpdateControl'

@Entity()
export class Career extends EntityUpdateControl {
  @PrimaryGeneratedColumn('increment')
  public id!: number

  @Column()
  public name!: string

  @Column()
  public description!: string

  @OneToOne(type => Job, jobs => Job)
  job!: Job
}
