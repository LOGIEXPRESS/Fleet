
import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, IsUUID, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { SingUp } from '../models/signup';

@Table
export class Carrier extends Model{

    @IsUUID(4)
    @Column({ primaryKey: true })
    id!: string

    @Column
    license!: string 

    @Column
    brand!: string

    @Column
    patent!: string

    @Column
    model!: string 

    @Column
    color!: string

    @Column
    capacity!: number
 
    @BelongsTo(()=>SingUp)
    carrier!:SingUp
   
   @ForeignKey(()=>SingUp)
   CarrierId!:string

}