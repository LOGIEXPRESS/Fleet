
import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, IsUUID, BelongsTo, ForeignKey , HasMany } from 'sequelize-typescript'
import { Signup } from './Signup';
import { Travel } from './Travel';

@Table
export class Truck extends Model{

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

    @Column
    status!: boolean
 
    @BelongsTo(()=>Signup)
    carrier!:Signup
   
   @ForeignKey(()=>Signup)
   SignupId!:string

   @HasMany(() => Travel)
   travels!: string
   
   @Column
   cbu!: string

}