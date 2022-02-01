import {AutoIncrement, Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, HasOne, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Carrier } from './carrier';
// import { Review } from './Review';
import { Admin } from './admin';
import { Travel } from './travel';

@Table
export class ServiceAlert extends Model {

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

    @BelongsTo(() => Carrier)
    carrier!: Carrier

    @ForeignKey(() => Carrier)
    CarrierId!: string



}