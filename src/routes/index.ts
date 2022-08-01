import { Router } from "express";
import { autheticateRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";



const router = Router()

router.use("/auth", autheticateRoutes)
router.use("/user", userRoutes)

export {router}