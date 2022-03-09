import { Model, Column, Table, IsUUID} from 'sequelize-typescript'

import {DataType} from 'sequelize-typescript';

@Table
export class Payment extends Model {
  @IsUUID(4)
  @Column({ primaryKey: true })
  id!: string;

  @Column
  name!: string;

  @Column
  email!: string;

  @Column(DataType.TEXT)
  description!: string;

}