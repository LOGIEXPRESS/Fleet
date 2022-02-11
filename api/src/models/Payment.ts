import { Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, BelongsTo, PrimaryKey, ForeignKey, HasMany, DataType} from 'sequelize-typescript'
import { Truck } from './Truck'
// import { Signup } from './Signup'
// import { Carrier } from './Carrier'


@Table
export class Payment extends Model {
  @IsUUID(4)
  @Column({ primaryKey: true })
  id!: string;

  @Column
  amount!: number;

  @Column
  status!: boolean;


  @BelongsTo(() => Truck)
  Truck!: Truck;

  @ForeignKey(() => Truck)
  TruckId!: string;

}