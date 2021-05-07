import { Op } from "sequelize";
import { DbConfig } from "../config/db.config"
import { EventReq, JoinReq } from "../interfaces/event.interface";
import { Event, EventType } from "../models/event.model";
import { Participant } from "../models/participant.model";
import { ResponseObject } from "../models/response.model";
import { User } from "../models/user.model";
import { getTransaction } from "../utils/db.utilts";
import { Logger } from "../utils/logger.utils";

export class EventService {
    public static createEvent(body: any) {
        return new Promise(async (resolve, reject) => {
            await DbConfig.connect();
            const trans = await getTransaction();
            try {
                Logger.info(`Entering <EventService.create> with ${JSON.stringify({ body: body })}`);
                body.startTime = (new Date(body.startTime)).toISOString().slice(0, 19).replace('T', ' ');
                body.endTime = (new Date(body.endTime)).toISOString().slice(0, 19).replace('T', ' ');
                let eventParams: EventReq = body;
                let event = await Event.create(eventParams, {
                    transaction: trans
                });
                await Participant.create({
                    userId: eventParams.creator,
                    eventId: event.dataValues.id,
                    status: 1
                }, {transaction: trans})
                await trans.commit();
                resolve(new ResponseObject(200, "User created successfully", event, null));
            } catch (error) {
                Logger.error('Rejecting from <EventService.create>');
                Logger.error(error);
                await trans.rollback()
                reject(error);
            } finally {
                DbConfig.closeConnection();
            }
        })
    }

    public static joinEvent(body) {
        return new Promise(async (resolve, reject) => {
            await DbConfig.connect();
            const trans = await getTransaction();
            try {
                let paylod: JoinReq = body;
                paylod.status = 1;
                const participant = await Participant.create(paylod, {transaction: trans});
                await trans.commit();
                resolve(participant);
            } catch (error) {
                Logger.error('Rejecting from <EventService.create>');
                Logger.error(error);
                await trans.rollback()
                reject(error);
            } finally {
                DbConfig.closeConnection();
            }
        })
    }

    public static getEventTypes() {
        return new Promise(async (resolve, reject) => {
            try {
                await DbConfig.connect();
                let result = await EventType.findAll({
                    attributes: ['id', 'type']
                });
                resolve(result);
            } catch (err) {
                Logger.error(err);
                Logger.info('Error Resolving Query');
                reject(err);
            } finally {
                DbConfig.closeConnection();
            }
        })
    }

    public static getAllEvents(limit: number, offset: number, key: string) {
        return new Promise(async (resolve, reject) => {
            try {
                await DbConfig.connect();
                Logger.info('Entering <EventService.getAllEvents>');
                let result: any;
                if (key && key.length != 0) {
                    result = await Event.findAndCountAll({
                        include: [
                            {
                                model: EventType,
                                attributes: ['id', 'type']
                            },
                            {
                                model: User,
                                attributes: [
                                    'id', 'userName', 'firstName', 'lastName'
                                ]
                            },
                            {
                                model: Participant,
                                attributes: [
                                    'id','userId', 'status'
                                ]
                            }
                        ],
                        order: [
                            ['startTime', 'DESC']
                        ],
                        offset: offset,
                        limit: limit,
                        where: {
                            name: {
                                [Op.like]: '%' + key+ '%'
                            }
                        }
                    });
                } else {
                    result = await Event.findAndCountAll({
                        include: [
                            {
                                model: EventType,
                                attributes: ['id', 'type']
                            },
                            {
                                model: User,
                                attributes: [
                                    'id', 'userName', 'firstName', 'lastName'
                                ]
                            },
                            {
                                model: Participant,
                                attributes: [
                                    'id','userId', 'status'
                                ]
                            }
                        ],
                        order: [
                            ['startTime', 'DESC']
                        ],
                        offset: offset,
                        limit: limit
                    });
                }
                resolve(result);
            } catch (err) {
                Logger.error(err);
                Logger.info('Error Resolving Query');
                Logger.info('Rejecting promise of <EventService.getAllEvents>');
                reject(err);
            } finally {
                DbConfig.closeConnection();
            }
        })
    }

    public static getEventById(eventId: number) {
        return new Promise(async (resolve, reject) => {
            try {
                await DbConfig.connect();
                Logger.info(`Entering <EventService.getEventById> with ${eventId}`);

                const result = await Event.findOne({
                    include: [
                        {
                            model: EventType,
                            attributes: ['id', 'type']
                        },
                        {
                            model: User,
                            attributes: [
                                'id', 'userName', 'firstName', 'lastName'
                            ]
                        },
                        {
                            model: Participant,
                            attributes: [
                                'id','userId', 'status'
                            ]
                        }
                    ],
                    where: {
                        id: eventId
                    }
                });

                Logger.info(`Resolving <EventService.getEventById> with ${JSON.stringify(result)}`);
                resolve(result);
            } catch (err) {
                Logger.error(err);
                Logger.info('Error Resolving Query');
                Logger.info('Rejecting promise of <EventService.getEventById>');
                reject(err);
            } finally {
                DbConfig.closeConnection();
            }
        })
    }

    public static getHostedEventsByUser(userId: number) {
        return new Promise(async (resolve, reject) => {
            try {
                await DbConfig.connect();
                Logger.info(`Entering <EventService.getHostedEventsByUser> with ${userId}`);

                const result = await Event.findAll({
                    include: [
                        {
                            model: EventType,
                            attributes: ['id', 'type']
                        },
                        {
                            model: User,
                            attributes: [
                                'id', 'userName', 'firstName', 'lastName'
                            ]
                        },
                        {
                            model: Participant,
                            attributes: [
                                'id','userId', 'status'
                            ]
                        }
                    ],
                    where: {
                        creator: userId
                    }
                });

                Logger.info(`Resolving <EventService.getHostedEventsByUser> with ${JSON.stringify(result)}`);
                resolve(result);
            } catch (err) {
                Logger.error(err);
                Logger.info('Error Resolving Query');
                Logger.info('Rejecting promise of <EventService.getHostedEventsByUser>');
                reject(err);
            } finally {
                DbConfig.closeConnection();
            }
        })
    }

    public static getJoinedEventsByUser(userId: number) {
        return new Promise(async (resolve, reject) => {
            try {
                await DbConfig.connect();
                Logger.info(`Entering <EventService.getJoinedEventsByUser> with ${userId}`);

                const result = await Event.findAll({
                    include: [
                        {
                            model: EventType,
                            attributes: ['id', 'type']
                        },
                        {
                            model: User,
                            attributes: [
                                'id', 'userName', 'firstName', 'lastName'
                            ]
                        },
                        {
                            model: Participant,
                            attributes: [
                                'id','userId', 'status'
                            ],
                            where: {
                                userId: userId
                            }
                        }
                    ],
                    where: {
                        creator: { [Op.ne]: userId}
                    }
                });

                Logger.info(`Resolving <EventService.getJoinedEventsByUser> with ${JSON.stringify(result)}`);
                resolve(result);
            } catch (err) {
                Logger.error(err);
                Logger.info('Error Resolving Query');
                Logger.info('Rejecting promise of <EventService.getJoinedEventsByUser>');
                reject(err);
            } finally {
                DbConfig.closeConnection();
            }
        })
    }

    public static deleteEvent(eventId: number) {
        return new Promise(async (resolve, reject) => {
            const trans = await getTransaction();
            try {
                await DbConfig.connect();
                Logger.info(`Entering <EventService.deleteEvent> with ${eventId}`);

                const event = await Event.findOne({
                    where: {
                        id: eventId
                    }
                });
                if(!event) {
                    resolve(new ResponseObject(400, "Event does not exist", null, null));
                }
                const result = await Event.update({isDeleted: true }, {
                    where: {
                        id: eventId
                    },
                    transaction: trans
                })
                await trans.commit();
                Logger.info(`Resolving <EventService.deleteEvent> with ${JSON.stringify(result)}`);
                resolve(result);
            } catch (err) {
                await trans.rollback()
                Logger.error(err);
                Logger.info('Error Resolving Query');
                Logger.info('Rejecting promise of <EventService.deleteEvent>');
                reject(err);
            } finally {
                DbConfig.closeConnection();
            }
        })
    }
}