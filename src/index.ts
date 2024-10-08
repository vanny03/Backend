import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source.js"
import { Routes } from "./routes.js"
import { User } from "./entity/User.js"
import { Product } from "./entity/Product.js";
import { loginRoutes } from "./routes/loginRoutes.js"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())  
    app.use(cors({
        origin: '*',
    }))

    // Register the login routes
    app.use('/api', loginRoutes);   

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })
    // start express server
    app.listen(3000)

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results") 

}).catch(error => console.log(error))
