import{userRoutes} from "./routes/userRoutes.js";
import {productRoutes} from "./routes/productRoutes.js";
// import { loginRoutes } from "./routes/loginRoutes.js";



export const Routes = [
    ...userRoutes,
    ...productRoutes,
    // ...loginRoutes
]