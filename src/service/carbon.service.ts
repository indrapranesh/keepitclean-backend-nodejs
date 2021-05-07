import { DbConfig } from "../config/db.config";
import { CarbonEmissionActivity, CarbonEmissionCategory, CarbonEmissionFactor } from "../models/carbon.model";
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
}