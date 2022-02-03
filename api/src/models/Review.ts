
import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, IsUUID, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Travel } from './Travel';

@Table
export class Review extends Model{

    @IsUUID(4)
    @Column({ primaryKey: true })
    id!: string;

    // @Column
    // id_viaje!: number

    // @Column
    // User_raiting!: number

    @Column
    Admin_comment!: string

    @Column
    Carrrier_raiting!: number

    @Column
    Carrier_report!: string

    @BelongsTo(() => Travel)
    travel!: Travel

    @ForeignKey(() => Travel)
    travelId!: string


}

