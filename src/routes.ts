import { Router } from 'express'
import blogController from './controllers/blog.controller'

const router: Router = Router()

const register = router.post('/register', blogController.registerUser)

const allUsers = router.get('/users', blogController.showUsers)

const userId = router.get('/user/:id', blogController.UserId)

const editUser = router.patch('/editUser/:id', blogController.editUser)

const deleteUser = router.delete('/deleteUser/:id', blogController.deleteUser)

export = {
    register,
    allUsers,
    userId,
    editUser,
    deleteUser,
}

