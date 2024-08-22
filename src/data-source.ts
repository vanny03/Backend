import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User.js"
import { Product } from "./entity/Product.js"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "visal",
    password: "visal2442",
    database: "cafe_management_system",
    synchronize: true,
    logging: false,
    entities: [User, Product],
    migrations: [],
    subscribers: [],
})
