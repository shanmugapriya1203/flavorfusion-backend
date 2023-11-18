import express from 'express'
import { login, register, updateUser } from '../controllers/userController.js'
import protectRoute from './../middleware/protectRoute.js';

const router= express.Router()
router.post('/register',register)
router.post('/login',login)
router.post('/update/:id',protectRoute,updateUser)









export default router