import { LocalLaws } from '../models/localLaw.model';
import { DbConfig } from "../config/db.config"

export class LawService {
    public static async getLaws() {
        return new Promise(async(resolve, reject) => {
            await DbConfig.connect();
            try {
                let laws = await LocalLaws.findAll({
                    attributes: ['id','state','code','reference']
                });
                resolve(laws);
            } catch (err) {
                reject(err);
            } finally {
                DbConfig.closeConnection();
            }
        })
    }
}