import express from 'express'
import protectRoute from './../middleware/protectRoute.js';
import { addRecipe, getRecipesByUserId } from '../controllers/recipeConroller.js';

const router= express.Router()

router.post('/create/:id',protectRoute,addRecipe)
router.get('/:id',protectRoute,getRecipesByUserId)
export default router