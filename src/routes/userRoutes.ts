import { UserController } from "../controller/UserController.js";


export const userRoutes = [
{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, 

{
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
},

{
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
},

// Update user
{
    method: "put", // or "patch" if you prefer
    route: "/users/:id",
    controller: UserController,
    action: "update"
},

{
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}]