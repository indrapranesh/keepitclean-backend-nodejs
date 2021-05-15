import { DbConfig } from "../config/db.config";
import { Achievement, UserAchievementMapper } from "../models/achievement.model"
import { getTransaction } from "../utils/db.utilts";
import { Logger } from "../utils/logger.utils";

export class AchievementService {
    public static async achievementShown(id: number) {
        return new Promise(async (resolve, reject) => {
            await DbConfig.connect();
            const trans = await getTransaction();
            try {
                Logger.info(`Entering achievementShown with ${id}`)
                let response = await UserAchievementMapper.update({
                    isShown: true
                }, {
                    where: {id: id},
                    transaction: trans
                });
                console.log(response);
                trans.commit();
                resolve(response);
            } catch (error) {
                Logger.error(error);
                await trans.rollback()
                reject(error);
            } finally {
                DbConfig.closeConnection();
            }
        })
    }

    public static async getUserAchievements(userId: number)  {
        return new Promise(async (resolve, reject) => {
            await DbConfig.connect();
            try {
                let response = await UserAchievementMapper.findAll({
                    where: { userId: userId },
                    include: [
                        {
                            model: Achievement,
                            attributes: ['id', 'name', 'description', 'logoUrl']
                        }
                    ]
                });
                resolve(response);
            } catch (error) {
                Logger.error(error);
                reject(error);
            } finally {
                DbConfig.closeConnection();
            } 
        })
    }
}