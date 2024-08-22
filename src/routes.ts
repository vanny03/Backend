import{userRoutes} from "./routes/userRoutes.js";
import {productRoutes} from "./routes/productRoutes.js";


export const Routes = [
    ...userRoutes,
    ...productRoutes
]