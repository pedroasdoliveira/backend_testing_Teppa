import { Router } from 'express'
import blogController from './controllers/blog.controller'

const router: Router = Router()

const register = router.post('/register', blogController.registerUser)

const allUsers = router.get('/users', blogController.showUsers)

export = {
    register,
    allUsers
}

