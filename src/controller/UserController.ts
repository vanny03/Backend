import { AppDataSource } from "../data-source.js"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User.js"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age
        })

        return this.userRepository.save(user)
    }

    // update user
    async update(request: Request, response: Response, next: NextFunction) {
        const userId = parseInt(request.params.id);
        const userData = request.body;

        try {
            let user = await this.userRepository.findOneBy({ id: userId });

            if (!user) {
                return response.status(404).json({ message: "User not found" });
            }

            // Update user properties
            this.userRepository.merge(user, userData);

            const updatedUser = await this.userRepository.save(user);

            response.json(updatedUser);
        } catch (error) {
            next(error);
        }
    }

    // delete user
    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

}