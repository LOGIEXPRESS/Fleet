import { Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, HasOne, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Truck } from './Truck';
import { Review } from './Review';
import { Carrier } from './Carrier';
import { Signup } from './Signup';

@Table
export class Travel extends Model{
 
    @IsUUID(4)
    @Column({ primaryKey: true })
    id!: string;

    @Column
    orig !: string

    @Column
    destination!: string

    @Column
    price!: string

    @Column
    weight!: string

    @Column
    description!: string
    
    @Column
    finishedTravel!: string

    @Column
    statusPay!: string

    @CreatedAt
    @Column
    createdAt!: Date

    @UpdatedAt
    @Column
    updatedAt!: Date

    @BelongsTo(() => Truck)
    truck!: Truck

    @ForeignKey(() => Truck)
    truckId!: string

    @BelongsTo(() => Signup)
    admin!: Signup

    @ForeignKey(() => Signup)
    adminId!: string

    @HasOne(() => Review)
    rewiew!: Review

}