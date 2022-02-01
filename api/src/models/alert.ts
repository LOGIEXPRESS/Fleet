import {AutoIncrement, Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, HasOne, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Carrier } from './Carrier';
// import { Review } from './Review';
import { Admin } from './Admin';
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

    @BelongsTo(() => Carrier)
    carrier!: Carrier

    @ForeignKey(() => Carrier)
    CarrierId!: string



}