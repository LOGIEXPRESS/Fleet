import { Model, Column, Table, IsUUID, HasOne, ForeignKey } from 'sequelize-typescript'

import { Truck } from './Truck'
import { Carrier } from './Carrier'


export interface IUser extends Signup {
    eMail: string,
    password: string
}


@Table
export class Signup extends Model {

    @IsUUID(4)
    @Column({ primaryKey: true })
    id!: string

    @HasOne(() => Truck)
    carrier!: Truck

    @HasOne(() => Carrier)
    admin!: Carrier

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

    @Column
    saldo!:string

    @Column
    locacion!:string


}