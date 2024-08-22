import { ProductController } from "../controller/ProductController.js";

export const productRoutes = [
    {
        method: "get",
        route: "/products",
        controller: ProductController,
        action: "getAllProduct"
    }, 
    
    {
        method: "get",
        route: "/products/:id",
        controller: ProductController,
        action: "oneProduct"
    },
    
    {
        method: "post",
        route: "/products",
        controller: ProductController,
        action: "saveProduct"
    },

    // Update user
    {
        method: "put",
        route: "/products",
        controller: ProductController,
        action: "updateProduct"
    },
   
    {
        method: "delete",
        route: "/products/:id",
        controller: ProductController,
        action: "removeProduct"
    }]

