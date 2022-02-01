import { Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, HasOne, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Carrier } from './carrier';
// import { Review } from './Review';
import { Admin } from './admin';

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

    // @HasOne(() => Review)
    // rewiew!: Review

    @CreatedAt
    @Column
    createdAt!: Date

    @UpdatedAt
    @Column
    updatedAt!: Date

    @BelongsTo(() => Admin)
    admin!: Admin

    @ForeignKey(() => Admin)
    adminId!: any

    @BelongsTo(() => Carrier)
    carrier!: Carrier

    @ForeignKey(() => Carrier)
    carrierId!: string



}