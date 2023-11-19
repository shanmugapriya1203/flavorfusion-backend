import express from 'express'
import { getAllUsers, login, logoutUser, register, updateUser } from '../controllers/userController.js'
import protectRoute from './../middleware/protectRoute.js';

const router= express.Router()
router.post('/register',register)
router.get('/allusers',getAllUsers)
router.post('/login',login)
router.post('/logout',logoutUser)
router.post('/update/:id',protectRoute,updateUser)
export default router