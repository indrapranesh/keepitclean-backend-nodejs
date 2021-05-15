import { NotFoundException } from "../exceptions/not-found.exception";
import { AchievementService } from "../service/achievement.service";
import { Logger } from "../utils/logger.utils";

class AchievementApi {
    static achievementShown(event) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!event.path && ! event.path.achievementId) {
                    throw new NotFoundException('Missing Achievement ID in event path params');
                }
                let response = await AchievementService.achievementShown(event.path.achievementId);
                resolve(response);
            } catch(err) {
                Logger.info(err);
                reject(err);
            }
        })
    }

    static getUserAchievements(event) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!event.path && ! event.path.userId) {
                    throw new NotFoundException('Missing userId in event path params');
                }
                let response = await AchievementService.getUserAchievements(event.path.userId);
                resolve(response);
            } catch(err) {
                Logger.info(err);
                reject(err);
            }
        })
    }
}

export const achievementShown = AchievementApi.achievementShown;
export const getUserAchievements = AchievementApi.getUserAchievements;