import { DbConfig } from "../config/db.config";
import { Cognito } from "../integrations/cognito.integrations";
import { ISignupReq } from "../interfaces/request.interface";
import { UserData } from "../interfaces/user.interface";
import { ResponseObject } from "../models/response.model";
import { User } from "../models/user.model";
import { getTransaction } from "../utils/db.utilts";
import { Extensions } from "../utils/extensions";
import { Logger } from "../utils/logger.utils";

export class UserService {
    public static create(user: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await DbConfig.connect();
            const trans = await getTransaction();
            try {
                Logger.info(`Entering <UserService.create> with ${JSON.stringify({ user: user })}`);
                let userParams: UserData = user;
                const userExist = await User.count({
                    where: {
                        email: userParams.email
                    }
                });
                if (userExist > 0) {
                    Logger.info('User already exist');
                    resolve(new ResponseObject(400, "User already Exists", null, null));
                } else {
                    Logger.info(`User doesn't exist. Creating new user`);
                    const signupReq: ISignupReq = {
                        firstName: userParams.firstName,
                        lastName: userParams.lastName,
                        userName: userParams.userName,
                        email: userParams.email,
                        phoneNumber: userParams.phoneNumber,
                        password: Extensions.generatePassword(),
                        cognitoUserName: userParams.email,
                        code: '',
                        isFirstLogin: true
                    }
                    const cognitoUserName = await Cognito.addUser(signupReq, true);
                    userParams.cognitoUserName = cognitoUserName;
                    userParams.isFirstLogin = true;
                    let user = await User.create(userParams, {
                        transaction: trans
                    });
                    await trans.commit();
                    resolve(new ResponseObject(200, "User created successfully", user, null));
                }
            } catch (error) {
                Logger.error('Rejecting from <UserService.create>');
                Logger.error(error);
                await trans.rollback()
                reject(error);
            } finally {
                DbConfig.closeConnection();
            }
        })
    }
}