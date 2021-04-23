import { NotFoundException } from "../exceptions/not-found.exception";
import { ParticipantService } from "../service/participant.service";

class ParticipantApi {
    static joinEvent(event) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!event.path && ! event.path.userId) {
                    throw new NotFoundException('Missing userId in event path params');
                }
                if (!event.path && ! event.path.eventId) {
                    throw new NotFoundException('Missing eventId in event path params');
                }
                const userId = event.path.userId;
                const eventId = event.path.eventId;
                const result = await ParticipantService.joinEvent(userId, eventId);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    // Mark as attended based upon the event location

    // static giveAttendance(event) {

    // }
}

export const joinEvent = ParticipantApi.joinEvent;