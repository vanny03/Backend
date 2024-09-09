import { AppDataSource } from "../data-source.js";
import express, { Request, Response } from "express";
import { Login } from "../entity/Login.js";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const tokenBlacklist: string[] = [];

export class AuthController {
    
    // ================== Login =================
    static async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        console.log("login", req.body);
        
        if (!username || !password) {
            res.status(400).json({ message: 'Username or password is required' });
            return;
        }

        try {
            const loginRepository = AppDataSource.getRepository(Login);

            // Find user by username
            const userlogin = await loginRepository.findOneBy({ username });
            if (!userlogin) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            // console.log(userlogin);
            
            // Compare the received password with the hashed password stored in the database
            const isPasswordValid = await bcrypt.compare(password, userlogin.password);
            // console.log("compare", isPasswordValid);
            
            if (!isPasswordValid) {
                res.status(401).json({ message: 'Invalid password' });
                return;
            }

            // Generate JWT Token
            const token = jwt.sign(
                { id: userlogin.id, username: userlogin.username },
                'your-secret-key',
                { expiresIn: '1h' }
            );

            // Return the token and user data
            res.status(200).json({ message: 'Login successful', token, user: userlogin });
        } 

        catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // ================== Register =================
    static async register(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: 'Username and password are required' });
            return;
        }

        try {
            const loginRepository = AppDataSource.getRepository(Login);

            // Check if the user already exists
            const existingUser = await loginRepository.findOneBy({ username });
            if (existingUser) {
                res.status(409).json({ message: 'User already exists' });
                return;
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user instance
            const newUser = new Login();
            newUser.username = username;
            newUser.password = hashedPassword;

            // Save the user to the database
            await loginRepository.save(newUser);

            // Generate JWT Token
            const token = jwt.sign(
                { id: newUser.id, username: newUser.username },
                'your-secret-key',
                { expiresIn: '1h' }
            );

            // Return the token and user data
            res.status(201).json({ message: 'Registration successful', token, user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // ======================== Logout ========================
    static async logout(req: Request, res: Response): Promise<void> {

        console.log(req.header('Authorization'));

        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            res.status(400).json({ message: 'Token is required' });
            return;
        }

        // Add the token to the blacklist
        tokenBlacklist.push(token);

        res.status(200).json({ message: 'Logout successful' });
    }

    // ===================== Reset password ===================
        static async resetPassword(req: Request, res: Response): Promise<void> {
            const {username, newPassword } = req.body;
            if (!username || !newPassword) {
                res.status(400).json({message: 'Username and password required'});
                return;
            }

            try{
                const loginRepository = AppDataSource.getRepository(Login);

                // Find user by username
                const userlogin = await loginRepository.findOneBy({ username });
                if (!userlogin) {
                    res.status(404).json({ message: 'User not found' });
                    return;
            }
            // Hash the new password
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            // Update user's password in the database
            userlogin.password = hashedNewPassword;
            await loginRepository.save(userlogin);

            res.status(200).json({ message: 'Password reset successful' });

            }
            catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        }
        
    // ================== Change Password ==================
    static async changePassword(req: Request, res: Response): Promise<void> {
        const { username, currentPassword, newPassword } = req.body;

        if (!username || !currentPassword || !newPassword) {
            res.status(400).json({ message: 'Username, current password, and new password are required' });
            return;
        }

        try {
            const loginRepository = AppDataSource.getRepository(Login);

            // Find user by username
            const userlogin = await loginRepository.findOneBy({ username });
            if (!userlogin) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            // Compare the current password with the hashed password in the database
            const isPasswordValid = await bcrypt.compare(currentPassword, userlogin.password);
            if (!isPasswordValid) {
                res.status(401).json({ message: 'Invalid current password' });
                return;
            }

            // Hash the new password
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            // Update user's password in the database
            userlogin.password = hashedNewPassword;
            await loginRepository.save(userlogin);

            res.status(200).json({ message: 'Password reset successful' });
        } 
        catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Middleware to check if a token is blacklisted
    static isTokenBlacklisted(token: string): boolean {
        return tokenBlacklist.includes(token);
    }
}


