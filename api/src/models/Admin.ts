import { Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, BelongsTo, PrimaryKey, ForeignKey, HasMany, DataType} from 'sequelize-typescript'
import { Travel } from './Travel'
import { Signup } from './Signup'

@Table
export class Admin extends Model {
    @IsUUID(4)
    @Column({ primaryKey: true })
    id!: string 
 
    @Column
    company!: string

    @Column(DataType.ARRAY(DataType.STRING))
    eMail!:string

    @BelongsTo(()=>Signup)
   admin!: Signup

    @ForeignKey(()=>Signup)
    SignupId!:string

    @HasMany(()=>Travel)
    travel!:Travel


}