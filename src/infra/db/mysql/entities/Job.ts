
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { BusinessOwner, Career, CareerSeniority, Flow } from '.'
import { EntityUpdateControl } from './EntityUpdateControl'

@Entity()
export class Job extends EntityUpdateControl {
  @PrimaryGeneratedColumn('increment')
  public id!: number

  @Column()
  public title!: string

  @Column()
  public description!: string

  @Column()
  public salary_range_max!: number

  @Column()
  public salary_range_min!: number

  @Column()
  public is_private!: boolean

  @Column()
  public is_active!: boolean

  @Column()
  public quantity!: number

  @ManyToOne(type => BusinessOwner, job => Job)
  @JoinColumn({ name: 'business_owner_id' })
  public businessOwner!: BusinessOwner

  @OneToOne(type => Career, job => Job, { nullable: true })
  @JoinColumn({ name: 'career_id' })
  public career!: Career

  @OneToOne(type => CareerSeniority, job => Job, { nullable: true })
  @JoinColumn({ name: 'career_seniority_id' })
  public careerSeniority!: CareerSeniority

  @OneToOne(type => Flow, job => Job, { nullable: true })
  @JoinColumn({ name: 'flow_id' })
  public flow!: Flow
}
