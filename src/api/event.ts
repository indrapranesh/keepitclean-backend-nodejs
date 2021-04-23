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
                if (!event.path && ! event.path.userId) {
                    throw new NotFoundException('Missing userId in event path params');
                }
                const userId = event.path.userId;
                const response = await EventService.createEvent(event.body, userId);
                Logger.info('Resolving promise from <EventApi.create>', response);
                resolve(response);
            } catch (error) {
                Logger.error(error);
                Logger.info('Rejecting promise from <EventApi.create>');
                reject(error);
            }
        });
    }

    static getAllEvents(event) {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info(`Entering <EventApi.getAllEvents> with ${event.query}`);
                const page = event.query.page ? +event.query.page : 0;
                const limit = event.query.size ? +event.query.size : 10;
                const offset = page * limit;
                const key = event.query.key;
                const result = await EventService.getAllEvents(limit, offset, key);
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
export const getEventById = EventApi.getEventById;
export const getHostedEventsByUser = EventApi.getHostedEventsByUser;
export const getJoinedEventsByUser = EventApi.getJoinedEventsByUser;
export const deleteEvent = EventApi.deleteEvent;