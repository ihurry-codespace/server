import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ColumnOptions } from 'typeorm'

function wrapDateTypesForTest (): any {
  if (process.env.NODE_ENV === 'test') {
    return {
      createdAt: { type: 'text' },
      updatedAt: { type: 'text' }
    }
  }
  return {
    createdAt: { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' },
    updatedAt: { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' }
  }
}
@Entity()
export class User {
  @PrimaryColumn()
  public id!: string

  @Column()
  public name!: string

  @Column()
  public password!: string

  @Column()
  public email!: string

  @Column()
  public avatar!: string

  @CreateDateColumn(wrapDateTypesForTest().createdAt as ColumnOptions)
  public createdAt!: Date

  @UpdateDateColumn(wrapDateTypesForTest().updatedAt as ColumnOptions)
  public updatedAt!: Date
}
