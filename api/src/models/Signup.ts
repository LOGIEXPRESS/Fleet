import { Model, Column, Table, IsUUID, HasOne, ForeignKey } from 'sequelize-typescript'

import { Carrier } from './Carrier'
import { Admin } from './Admin'


export interface IUser extends Signup {
    eMail: string,
    password: string
}


@Table
export class Signup extends Model {

    @IsUUID(4)
    @Column({ primaryKey: true })
    id!: string

    @HasOne(() => Carrier)
    carrier!: Carrier

    @HasOne(() => Admin)
    admin!: Admin

    @Column
    name!: string

    @Column
    lastName!: string
    
    @Column
    identification!: number

    @Column
    photo!: string
    
    @Column
    phone!: string
    
    @Column
    eMail!: string

    @Column
    password!: string

    @Column
    secret!: string

    @Column
    business!: string

    @Column
    role!: boolean


}