import { DbConfig } from "../config/db.config";
import { Participant, ParticipantStatus } from "../models/participant.model";
import { getTransaction } from "../utils/db.utilts"

export class ParticipantService {
    public static async joinEvent(userId, eventId) {
        const trans = await getTransaction();
        return new Promise(async (resolve, reject) => {
            try {
                await DbConfig.connect();
                let status: ParticipantStatus = await ParticipantStatus.findOne({
                    where: {status: 'Joined'}
                })
                let response = await Participant.create({
                    userId: userId,
                    eventId: eventId,
                    status: status.id
                }, {
                    transaction: trans
                });
                await trans.commit();
                resolve(response);
            } catch(error) {
                trans.rollback();
                reject(error);
            }
        })
    }
}