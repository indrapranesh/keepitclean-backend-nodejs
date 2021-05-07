import { Table, PrimaryKey, AutoIncrement, Column, DataType, Model, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript";
import { Participant } from "./participant.model";
import { User } from "./user.model";

@Table({
    tableName: 'EventType',
    modelName: 'EventType'
})
export class EventType extends Model<EventType> {
    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    type: string;
}


@Table({
    tableName: 'Event',
    modelName: 'Event'
})
export class Event extends Model<Event> {
    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => EventType)
    @Column(DataType.INTEGER)
    eventType: number;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    creator: number;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    description: string;

    @Column(DataType.STRING)
    address: string;

    @Column(DataType.STRING)
    latitude: number;

    @Column(DataType.STRING)
    longitude: number;

    @Column(DataType.STRING)
    imageUrl: string;

    @Column(DataType.STRING)
    startTime: Date;

    @Column(DataType.STRING)
    endTime: Date;

    @Column(DataType.STRING)
    phoneNumber: string;
    
    @Column(DataType.DATE)
    createdAt: Date;

    @Column(DataType.DATE)
    updatedAt: Date;

    @BelongsTo(() => EventType)
    type: EventType

    @BelongsTo(() => User)
    host: User

    @HasMany(() => Participant)
    participants: Participant
}