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

    static addUserCarbonEmission(event) {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info(event);
                const userId: number = parseInt(event.path.userId);
                const response = await CarbonService.addUserCarbonEmission(userId, event.body);
                resolve(response)
            } catch (error) {
                Logger.error(error);
                reject(error);
            }
        })
    }

    static getAllUserEmission(event) {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info(event);
                const userId: number = parseInt(event.path.userId);
                const response = await CarbonService.getAllUserEmission(userId);
                resolve(response)
            } catch (error) {
                Logger.error(error);
                reject(error);
            }
        })
    }
}

export const getEmissionCategories = CarbonApi.getEmissionCategories;
export const addUserCarbonEmission = CarbonApi.addUserCarbonEmission;
export const getAllUserEmission = CarbonApi.getAllUserEmission;