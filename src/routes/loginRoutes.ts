import { Router } from "express";
import { AuthController } from "../controller/AuthController.js";

const loginRoutes = Router();

// Login routes
loginRoutes.post('/login', AuthController.login);

// Register route
loginRoutes.post("/register", AuthController.register);

// Logout routes
loginRoutes.post("/logout", AuthController.logout);

// Change password route
loginRoutes.post("/change-password", AuthController.changePassword);

// Reset password route
loginRoutes.post("/reset-password", AuthController.resetPassword);

export { loginRoutes }; 
// export default loginRoutes;

