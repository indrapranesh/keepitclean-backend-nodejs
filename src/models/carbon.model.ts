import { Table, PrimaryKey, AutoIncrement, Column, DataType, Model, ForeignKey, HasMany, HasOne} from "sequelize-typescript";
import { User } from "./user.model";

@Table({
    tableName: 'CarbonEmissionCategory',
    modelName: 'CarbonEmissionCategory'
})
export class CarbonEmissionCategory extends Model<CarbonEmissionCategory> {
    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    category: string;

    @HasMany(() => CarbonEmissionActivity)
    activity: CarbonEmissionActivity
}



@Table({
    tableName: 'CarbonEmissionActivity',
    modelName: 'CarbonEmissionActivity'
})
export class CarbonEmissionActivity extends Model<CarbonEmissionActivity> {
    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => CarbonEmissionCategory)
    @Column(DataType.INTEGER)
    categoryId: number;

    @Column(DataType.STRING)
    activity: string;

    @HasOne(() => CarbonEmissionFactor)
    factor: CarbonEmissionFactor
}


@Table({
    tableName: 'CarbonEmissionFactor',
    modelName: 'CarbonEmissionFactor'
})
export class CarbonEmissionFactor extends Model<CarbonEmissionFactor> {
    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => CarbonEmissionActivity)
    @Column(DataType.INTEGER)
    activityId: number;

    @Column(DataType.STRING)
    baseUnit: string;

    @Column(DataType.INTEGER)
    emissionPerUnit: number;

    @Column(DataType.STRING)
    emissionUnit: string;
}


@Table({
    tableName: 'UserCarbonEmission',
    modelName: 'UserCarbonEmission'
})
export class UserCarbonEmission extends Model<UserCarbonEmission> {
    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId: number;

    @Column(DataType.DATE)
    date: Date;

    @Column(DataType.FLOAT)
    carbonEmission: number;

    @Column(DataType.DATE)
    createdAt: Date;

    @Column(DataType.DATE)
    updatedAt: Date;
}

