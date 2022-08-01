import { Router } from 'express'

import { AuthLoginController } from '../controllers/authLogin.controller'

const autheticateRoutes = Router()

const authLoginController = new AuthLoginController()


autheticateRoutes.post('/login', authLoginController.execute)

export { autheticateRoutes }