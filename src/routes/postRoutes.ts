import { UserController } from "../controller/UserController.js"

export const productRoutes = [
    {
        method: "get",
        route: "/products",
        controller: UserController,
        action: "getAllProduct"
    }, 
    
    {
        method: "get",
        route: "/products/:id",
        controller: UserController,
        action: "oneProduct"
    },
    
    {
        method: "post",
        route: "/products",
        controller: UserController,
        action: "saveProduct"
    },

    // Update user
    {
        method: "put",
        route: "/products",
        controller: UserController,
        action: "updateProduct"
    },
   
    {
        method: "delete",
        route: "/products/:id",
        controller: UserController,
        action: "removeProduct"
    }]