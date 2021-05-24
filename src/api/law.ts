import { LawService } from '../service/law.service';

class LawApi {
    static getLocalLaws() {
        return new Promise(async (resolve, reject) => {
            try {
                let laws = await LawService.getLaws();
                resolve(laws)
            } catch(err) {
                reject(err);
            }
        })
    }
}

export const getLocalLaws = LawApi.getLocalLaws;