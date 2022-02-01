import { Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, BelongsTo, PrimaryKey, ForeignKey, HasMany } from 'sequelize-typescript'
import { Travel } from './Travel'
import { SingUp } from './Signup'

@Table
export class Admin extends Model {
    @PrimaryKey
    @Column
    id!: string 
 
    @Column
    company!: string

    // @Column
    // eMail!: Array<string>

    @BelongsTo(()=>SingUp)
    user_Reg!: string

    @ForeignKey(()=>SingUp)
    idUserReg!:string

    @HasMany(()=>Travel)
    travel!:Travel


}