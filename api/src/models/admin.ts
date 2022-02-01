import { Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, BelongsTo, PrimaryKey, ForeignKey, HasMany, DataType} from 'sequelize-typescript'
import { Travel } from './Travel'
import { Signup } from './Signup'

@Table
export class Admin extends Model {
    @PrimaryKey
    @Column
    id!: string 
 
    @Column
    company!: string

    @Column(DataType.ARRAY(DataType.STRING))
    eMail!:string

    @BelongsTo(()=>Signup)
    user_Reg!: string

    @ForeignKey(()=>Signup)
    idUserReg!:string

    @HasMany(()=>Travel)
    travel!:Travel


}