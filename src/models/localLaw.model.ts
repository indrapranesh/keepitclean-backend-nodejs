import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'UsaLocalLaw',
    modelName: 'UsaLocalLaw'
})
export class LocalLaws extends Model<LocalLaws> {
    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    state: string;

    @Column(DataType.STRING)
    code: string;

    @Column(DataType.STRING)
    description: string;

    @Column(DataType.STRING)
    reference: string;
}