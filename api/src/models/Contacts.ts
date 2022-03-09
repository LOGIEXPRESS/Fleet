import { Model, Column, Table, IsUUID} from 'sequelize-typescript'

import {DataType} from 'sequelize-typescript';

@Table
export class Contacts extends Model {
  @IsUUID(4)
  @Column({ type: DataType.INTEGER, primaryKey: true , autoIncrement: true})
  id!: number;

  @Column
  name!: string;

  @Column
  email!: string;

  @Column(DataType.TEXT)
  description!: string;

}