import { Model, Column, Table, IsUUID} from 'sequelize-typescript'



@Table
export class Payment extends Model {
  @IsUUID(4)
  @Column({ primaryKey: true })
  id!: string;

  @Column
  name!: string;

  @Column
  email!: string;

  @Column
  description!: Text;

}