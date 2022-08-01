import { Router } from "express";

import {BlogController} from "../controllers/blog.controller";

const userRoutes = Router();

const blogController = new BlogController()

userRoutes.post('/register', blogController.registerUser)

userRoutes.get('/users', blogController.showUsers)

userRoutes.get('/user/:id', blogController.userId)

userRoutes.patch('/editUser/:id', blogController.editUser)

userRoutes.delete('/deleteUser/:id', blogController.deleteUser)

// userRoutes.post("/register", blogController.registerUser);
// userRoutes.get("/users", blogController.showUsers);
// userRoutes.get("/user/:id", blogController.UserId);
// userRoutes.patch("/editUser/:id", blogController.editUser);
// userRoutes.delete("/deleteUser/:id", blogController.deleteUser);

export { userRoutes };