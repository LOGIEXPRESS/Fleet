import { Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, BelongsTo, PrimaryKey, ForeignKey, HasMany, DataType} from 'sequelize-typescript'
import { Travel } from './Travel'
import { Signup } from './Signup'
import { Carrier } from './Carrier'


@Table
export class Payment extends Model {
    @IsUUID(4)
    @Column({ primaryKey: true })
    id!: string 
 
    @Column
    amount!: number

    @Column
    status!: boolean

    // @BelongsTo(()=>Carrier)
    // carrier!: Carrier

    // @ForeignKey(()=>Carrier)
    // CarrierId!: string

    @BelongsTo(()=>Signup)
    SignUp!: Signup

    @ForeignKey(()=>Signup)
    SignupId!: string

    @HasMany(()=>Travel)
    travel!:Travel


}