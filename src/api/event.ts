import { BusinessException } from "../exceptions/business.exception";
import { NotFoundException } from "../exceptions/not-found.exception";
import { EventService } from "../service/event.service";
import { Extensions } from "../utils/extensions";
import { Logger } from "../utils/logger.utils";

class EventApi {
    static createEvent(event) {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info('Entering <EventApi.create>');
                Logger.info(event);
                if (Extensions.isEmpty(event.body)) {
                    throw new BusinessException('Event data cannot be empty');
                }
                const response = await EventService.createEvent(event.body);
                Logger.info('Resolving promise from <EventApi.create>', response);
                resolve(response);
            } catch (error) {
                Logger.error(error);
                Logger.info('Rejecting promise from <EventApi.create>');
                reject(error);
            }
        });
    }

    static joinEvent(event) {
        return new Promise(async (resolve, reject) => {
            try {
                if (Extensions.isEmpty(event.body)) {
                    throw new BusinessException('Event data cannot be empty');
                }
                const response = await EventService.joinEvent(event.body);
                resolve(response)
            } catch (error) {
                Logger.error(error);
                reject(error);
            }
        })
    }

    static getEventTypes(event) {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info(`Entering <EventApi.getEventTypes> with ${event.query}`);
                const result = await EventService.getEventTypes();
                Logger.info(`Resolving promise from <EventApi.getEventTypes> with ${result}`);
                resolve(result);
            } catch (error) {
                Logger.error(error);
                Logger.info('Rejecting promise from <EventApi.getEventTypes>');
                reject(error);
            }
        });
    }

    static getAllEvents(event) {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info(`Entering <EventApi.getAllEvents> with ${JSON.stringify(event.query)} ${JSON.stringify(event.path)}`);
                const page = event.query.page ? +event.query.page : 0;
                const limit = event.query.size ? +event.query.size : 10;
                const offset = page * limit;
                if (!event.path && ! event.path.state) {
                    throw new NotFoundException('Missing City in event path params');
                }
                if (!event.query && ! event.query.date) {
                    throw new NotFoundException('Missing date in event path params');
                }
                const result = await EventService.getAllEvents(event.path.state,event.query.date, limit, offset);
                Logger.info(`Resolving promise from <EventApi.getAllEvents> with ${result}`);
                resolve(result);
            } catch (error) {
                Logger.error(error);
                Logger.info('Rejecting promise from <EventApi.getAllEvents>');
                reject(error);
            }
        });
    }

    static searchEvents(event) {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info(`Entering <EventApi.getAllEvents> with ${event.query}`);
                if (!event.query && ! event.query.key) {
                    throw new NotFoundException('Missing date in event path params');
                }
                if (!event.query && ! event.query.date) {
                    throw new NotFoundException('Missing date in event path params');
                }
                const result = await EventService.search(event.query.key, event.path.state, event.query.date);
                Logger.info(`Resolving promise from <EventApi.getAllEvents> with ${result}`);
                resolve(result);
            } catch (error) {
                Logger.error(error);
                Logger.info('Rejecting promise from <EventApi.getAllEvents>');
                reject(error);
            }
        });
    }

    static getEventById(event) {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info(`Entering <EventApi.getEventById> with ${event.query}`);
                if (!event.path && ! event.path.eventId) {
                    throw new NotFoundException('Missing eventId in event path params');
                }
                const eventId = event.path.eventId
                const result = await EventService.getEventById(eventId);
                Logger.info(`Resolving promise from <EventApi.getEventById> with ${result}`);
                resolve(result);
            } catch (error) {
                Logger.error(error);
                Logger.info('Rejecting promise from <EventApi.getEventById>');
                reject(error);
            }
        });
    }

    static getHostedEventsByUser(event) {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info(`Entering <EventApi.getHostedEventsByUser> with ${event.query}`);
                if (!event.path && ! event.path.userId) {
                    throw new NotFoundException('Missing userId in event path params');
                }
                const userId = event.path.userId;
                const result = await EventService.getHostedEventsByUser(userId);
                Logger.info(`Resolving promise from <EventApi.getHostedEventsByUser> with ${result}`);
                resolve(result);
            } catch (error) {
                Logger.error(error);
                Logger.info('Rejecting promise from <EventApi.getHostedEventsByUser>');
                reject(error);
            }
        });
    }

    static getJoinedEventsByUser(event) {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info(`Entering <EventApi.getJoinedEventsByUser> with ${event.query}`);
                if (!event.path && ! event.path.userId) {
                    throw new NotFoundException('Missing userId in event path params');
                }
                const userId = event.path.userId;
                const result = await EventService.getJoinedEventsByUser(userId);
                Logger.info(`Resolving promise from <EventApi.getJoinedEventsByUser> with ${result}`);
                resolve(result);
            } catch (error) {
                Logger.error(error);
                Logger.info('Rejecting promise from <EventApi.getJoinedEventsByUser>');
                reject(error);
            }
        });
    }

    static getParticipantsData(event) {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info(`Entering <EventApi.getParticipantsData> with ${event.query}`);
                if (!event.path && ! event.path.eventId) {
                    throw new NotFoundException('Missing userId in event path params');
                }
                const eventId = event.path.eventId;
                const result = await EventService.getParticipantsData(eventId);
                Logger.info(`Resolving promise from <EventApi.getParticipantsData> with ${result}`);
                resolve(result);
            } catch (error) {
                Logger.error(error);
                Logger.info('Rejecting promise from <EventApi.getParticipantsData>');
                reject(error);
            }
        });
    }

    static deleteEvent(event) {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info(`Entering <EventApi.deleteEvent> with ${event.query}`);
                if (!event.path && ! event.path.eventId) {
                    throw new NotFoundException('Missing eventId in event path params');
                }
                const eventId = event.path.eventId
                const result = await EventService.deleteEvent(eventId);
                Logger.info(`Resolving promise from <EventApi.deleteEvent> with ${result}`);
                resolve(result);
            } catch (error) {
                Logger.error(error);
                Logger.info('Rejecting promise from <EventApi.deleteEvent>');
                reject(error);
            }
        });
    }
}

export const createEvent = EventApi.createEvent;
export const getAllEvents = EventApi.getAllEvents;
export const searchEvents = EventApi.searchEvents;
export const getEventById = EventApi.getEventById;
export const getHostedEventsByUser = EventApi.getHostedEventsByUser;
export const getJoinedEventsByUser = EventApi.getJoinedEventsByUser;
export const deleteEvent = EventApi.deleteEvent;
export const getEventTypes = EventApi.getEventTypes;
export const joinEvent = EventApi.joinEvent;
export const getParticipantsData = EventApi.getParticipantsData;