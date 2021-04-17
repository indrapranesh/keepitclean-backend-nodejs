import { Table, PrimaryKey, AutoIncrement, Column, DataType, Model} from "sequelize-typescript";

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
}