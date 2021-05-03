
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import { Job } from '.'
import { EntityUpdateControl } from './EntityUpdateControl'

@Entity()
export class CareerSeniority extends EntityUpdateControl {
  @PrimaryGeneratedColumn('increment')
  public id!: number

  @Column()
  public name!: string

  @Column()
  public description!: string

  @OneToOne(type => Job, jobs => Job)
  job!: Job
}
