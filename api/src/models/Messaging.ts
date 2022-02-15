import { Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, BelongsTo, PrimaryKey, ForeignKey, HasMany, DataType} from 'sequelize-typescript'
import { Travel } from './Travel'
import { Signup } from './Signup'

@Table
export class Messaging extends Model {

    @IsUUID(4)
    @Column({type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true })
    id!: number
 
    @Column
    messageCarrier!: string
 
    @Column
    messageAdmin!:string
    

    @BelongsTo(()=>Signup)
    trasportista!: Signup

    @ForeignKey(()=>Signup)
    room!:string
 


}