import { DbConfig } from "../config/db.config";
import { Achievement, UserAchievementMapper } from "../models/achievement.model"
import { Event } from "../models/event.model";
import { Participant } from "../models/participant.model";
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

    public static async addAchievements(userId: number) {
        return new Promise(async (resolve, reject) => {
            await DbConfig.connect();
            const trans = await getTransaction();
            try {
                let hostedCount = await Event.count({
                    where: { creator: userId }
                });
                let participatedCount = await Participant.count({
                    where: { userId: userId}
                });
                let userAchievements: Array<UserAchievementMapper> = await UserAchievementMapper.findAll({where: {userId: userId}})
                let promises = [];
                let achievements: Array<Achievement> = await Achievement.findAll({
                    attributes: ['id', 'name', 'description', 'logoUrl', 'hostedCount', 'participatedCount'],
                });
                achievements.map((achievement) => {
                    const check = (element) => element.achievementId == achievement.id;
                    if(achievement.hostedCount > 0) {
                        if(hostedCount >= achievement.hostedCount) {
                            console.log('before check');
                            if(!userAchievements.some(check)) {
                                console.log('hello');
                                if(promises.length < 1) {
                                    promises.push(
                                        UserAchievementMapper.create({
                                            achievementId: achievement.id,
                                            userId: userId
                                        }, { transaction: trans})
                                    )
                                }
                            } 
                        }
                    } else if(achievement.participatedCount > 0) {
                        if(participatedCount >= achievement.participatedCount) {
                            console.log('before check');
                            if(!userAchievements.some(check)) {
                                console.log('hello1');
                                if(promises.length < 1) {
                                    promises.push(
                                        UserAchievementMapper.create({
                                            achievementId: achievement.id,
                                            userId: userId
                                        }, { transaction: trans})
                                    )
                                }
                            } 
                        }
                    }
                });
                await Promise.all(promises);
                await trans.commit();
                const result = await UserAchievementMapper.findAll({include: [{
                    model: Achievement,
                    attributes: ['id', 'name', 'description', 'logoUrl']
                }]})
                resolve(result);
            } catch (error) {
                Logger.error(error);
                await trans.rollback()
                reject(error);
            } finally {
                DbConfig.closeConnection();
            }
        })
    }

    public static async getAllAchievements()  {
        return new Promise(async (resolve, reject) => {
            await DbConfig.connect();
            try {
                let response = await Achievement.findAll({
                    attributes: ['id', 'name', 'description', 'logoUrl', 'hostedCount', 'participatedCount']
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