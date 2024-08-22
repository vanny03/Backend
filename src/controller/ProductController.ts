import { AppDataSource } from "../data-source.js"
import { NextFunction, Request, Response } from "express"
import { Product } from "../entity/Product.js"


export class ProductController {

    private productRepository = AppDataSource.getRepository(Product)

    async getAllProduct(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.find()
    }

    async oneProduct(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const product = await this.productRepository.findOne({
            where: { id }
        })

        if (!product) {
            return "unregistered product"
        }
        return product
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, price, description } = request.body;

        const product = Object.assign(new Product(), {
            name,
            price,
            description,
        })

        return this.productRepository.save(product)
    }

    async saveProduct(request: Request, response: Response, next: NextFunction) {
        try {
            const { id, name, price, description } = request.body;
    
            if (!name || price == null || !description) {
                return response.status(400).json({ message: 'Name, price, and description are required.' });
            }
    
            let product;
            
            if (id) {
                // Check if the product with the given ID exists
                product = await this.productRepository.findOne({ where: { id } });
    
                if (product) {
                    // Update existing product
                    product.name = name;
                    product.price = price;
                    product.description = description;
                } else {
                    // Return error if product not found
                    return response.status(404).json({ message: 'Product not found.' });
                }
            } else {
                // Create a new product if no ID is provided
                product = Object.assign(new Product(), {
                    name,
                    price,
                    description,
                });
            }
    
            // Save the product (either updated or new)
            const savedProduct = await this.productRepository.save(product);
            return response.status(200).json(savedProduct);
        } catch (error) {
            console.error('Error saving product:', error.message);
            console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
            return response.status(500).json({ message: 'Failed to save product.' });
        }
    }
    

    // update user
    // async updateProduct(request: Request, response: Response, next: NextFunction) {
    //     // const productId = parseInt(request.params.id);
    //     const productData = request.body;

    //     try {
    //         let product = await this.productRepository.findOneBy({ id: productData.id });

    //         if (!product) {
    //             return response.status(404).json({ message: "User not found" });
    //         }

    //         // Update user properties
    //         this.productRepository.merge(product, productData);

    //         const updatedProduct = await this.productRepository.save(product);

    //         response.json(updatedProduct);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // delete user
    async removeProduct(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let productToRemove = await this.productRepository.findOneBy({ id })

        if (!productToRemove) {
            return "this user not exist"
        }

        await this.productRepository.remove(productToRemove)

        console.log("love you!");
        

        return "product has been removed"

    }


}