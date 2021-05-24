import { Table, PrimaryKey, AutoIncrement, Column, DataType, Model, ForeignKey, HasMany, HasOne} from "sequelize-typescript";
import { UserAchievementMapper } from "./achievement.model";

@Table({
    tableName: 'User',
    modelName: 'User'
})
export class User extends Model<User> {
    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    firstName: string;

    @Column(DataType.STRING)
    lastName: string;

    @Column(DataType.STRING)
    userName: string;

    @Column(DataType.STRING)
    cognitoUserName: string;

    @Column(DataType.STRING)
    phoneNumber: string;

    @Column(DataType.STRING)
    email: string;

    @Column(DataType.BOOLEAN)
    isFirstLogin: boolean;

    @Column(DataType.DATE)
    createdAt: Date;

    @Column(DataType.DATE)
    updatedAt: Date;

    @HasMany(()=> UserAchievementMapper)
    achievements: UserAchievementMapper;

    @HasOne(() => UserAddress)
    address: UserAddress
}

@Table({
    tableName: 'UserAddress',
    modelName: 'UserAddress'
})
export class UserAddress extends Model<UserAddress> {
    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId: number;

    @Column(DataType.STRING)
    address: string;

    @Column(DataType.STRING)
    state: string;

    @Column(DataType.STRING)
    country: string;

    @Column(DataType.STRING)
    latitude: string;

    @Column(DataType.STRING)
    longitude: string;

    @Column(DataType.DATE)
    createdAt: Date;

    @Column(DataType.DATE)
    updatedAt: Date;
}