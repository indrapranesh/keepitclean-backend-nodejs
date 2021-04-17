import { Sequelize } from "sequelize-typescript";
import { Logger } from "../utils/logger.utils";
import { Session } from "../namespaces/session.namespace";
import { SESSION_VARIABLES } from "../constants/aws.constants";

export class DbConfig {
    private static sequelize: Sequelize = null;

    constructor() {
    }

    public static async connect() {
        await this.init();
        this.sequelize.authenticate().then(function () {
            Logger.debug('Connection has been established successfully.');
        })
        .catch(function (error) {
            Logger.error('Unable to connect to the database:', error);
        });
    }

    public static async closeConnection() {
        this.sequelize.close();
    }

    public static async init() {
        // let dbSecrets = await DBManager.getSecrets();
        // dbSecrets = JSON.parse(dbSecrets);
        const host = 'localhost'
        , database = 'ar_op_master'
        , username = 'root'
        , password = 'testpass'
            , port = 3306

        this.sequelize = new Sequelize({
            database: database,
            password: password,
            dialect: 'mysql',
            username: username,
            port: port,
            host: host,
            benchmark: true,
            dialectOptions: {
                connectTimeout: 25000
            }
        });
        Logger.debug('Entering <init>')
        this.registerModels();
        Session.setValue(SESSION_VARIABLES.SEQUELIZE, this.sequelize);
        Logger.debug('Exiting <init>');
    }

    public static registerModels() {
        Logger.debug('Entering <registerModels>');
        this.sequelize.addModels([
           User,
           UserRole,
           Marker,
           MarkerImage,
           Realm,
           MarkerVideo,
           ModelDetails,
           UserRealmMapper
        ])
    }
}