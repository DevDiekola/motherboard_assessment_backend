import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User.js"
import { Hospital } from "./entity/Hospital.js"
import { RefreshToken } from "./entity/RefreshToken.js"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "motherboard_assessment",
    synchronize: true,
    logging: false,
    entities: [User, RefreshToken, Hospital],
    migrations: [],
    subscribers: [],
})
