import { CarbonService } from "../service/carbon.service";
import { Logger } from "../utils/logger.utils";

class CarbonApi {
    static getEmissionCategories(event) {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info(event);
                const response = await CarbonService.getEmissionCategories();
                resolve(response)
            } catch (error) {
                Logger.error(error);
                reject(error);
            }
        })
    }
}

export const getEmissionCategories = CarbonApi.getEmissionCategories;