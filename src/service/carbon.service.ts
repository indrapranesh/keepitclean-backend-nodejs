import { DbConfig } from "../config/db.config";
import { CarbonEmissionActivity, CarbonEmissionCategory, CarbonEmissionFactor, UserCarbonEmission } from "../models/carbon.model";
import { getTransaction } from "../utils/db.utilts";
import { Logger } from "../utils/logger.utils";

export class CarbonService {
    public static async getEmissionCategories() {
        return new Promise(async(resolve, reject) => {
            try {
                await DbConfig.connect();
                let result = await CarbonEmissionCategory.findAll({
                    attributes: ['id', 'category'],
                    include: [
                        {
                            model: CarbonEmissionActivity,
                            attributes: ['id', 'activity'],
                            include: [{
                                model: CarbonEmissionFactor,
                                attributes: ['id', 'baseUnit', 'emissionPerUnit', 'emissionUnit']
                            }]
                        }
                    ]
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

    public static async addUserCarbonEmission(userId: number, body) {
        return new Promise(async (resolve, reject) => {
            await DbConfig.connect();
            const trans = await getTransaction();
            try {
                console.log(typeof(userId));
                let payload = {...body, userId: userId};
                console.log(payload);
                let result = await UserCarbonEmission.create(payload, 
                    {
                        transaction: trans
                });
                await trans.commit();
                resolve(result);
            } catch (err) {
                Logger.error(err);
                await trans.rollback();
                Logger.info('Error Resolving Query');
                reject(err);
            } finally {
                DbConfig.closeConnection();
            }
        })
    }

    public static async getAllUserEmission(userId: number){
        return new Promise(async (resolve, reject) => {
            await DbConfig.connect();
            try {
                let result: Array<UserCarbonEmission> = await UserCarbonEmission.findAll({
                    where: {
                        userId: userId
                    }
                });
                resolve(result)
            } catch (err) {
                Logger.error(err);
                Logger.info('Error Resolving Query');
                reject(err);
            } finally {
                DbConfig.closeConnection();
            }
        })
    }
}