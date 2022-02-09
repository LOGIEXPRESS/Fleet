import {AutoIncrement, Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, HasOne, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Truck } from './Truck';
// import { Review } from './Review';
import { Carrier } from './Carrier';
import { Travel } from './Travel';
import { Service } from 'ts-node';

@Table
export class Alert extends Model{

    @AutoIncrement
    @Column({ primaryKey: true })
    id!: number;


    @CreatedAt
    @Column
    createdAt!: Date

    @UpdatedAt
    @Column
    updatedAt!: Date

    @BelongsTo(() => Travel)
    travel!: Travel

    @ForeignKey(() => Travel)
    TravelId!: string

    @BelongsTo(() => Truck)
    truck!: Truck

    @ForeignKey(() => Truck)
    TruckId!: string



}