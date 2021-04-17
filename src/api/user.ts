import { userBusinessException } from "../exceptions/business-exceptions/user.business.exception";
import { UserService } from "../service/user.service";
import { Extensions } from "../utils/extensions";
import { Logger } from "../utils/logger.utils";

class UserApi {
    static create(event, context) {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info('Entering <UsersApi.create>');
                context.callbackWaitsForEmptyEventLoop = false;
                Logger.info(event);
                if (Extensions.isEmpty(event.body)) {
                    throw new userBusinessException.BusinessExceptionEmptyUserId('User data cannot be empty');
                }
                if (Extensions.isUndefined(event.body.userData)) {
                    throw new userBusinessException.BusinessExceptionInvalidUserData('Invalid user data');
                }
                const response = await UserService.create(event.body.userData);
                Logger.info('Resolving promise from <UsersApi.create>', response);
                resolve(response);
            } catch (error) {
                Logger.error(error);
                Logger.info('Rejecting promise from <UsersApi.create>');
                reject(error);
            }
        });
    }
}

export const create = UserApi.create;