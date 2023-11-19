import express from 'express'
import protectRoute from './../middleware/protectRoute.js';
import { addRecipe, deleteRecipeById, getRecipeById, getRecipesByUserId } from '../controllers/recipeConroller.js';

const router= express.Router()

router.post('/create/:id',protectRoute,addRecipe)
router.get('/:id',protectRoute,getRecipesByUserId)
router.get('/detail/:recipeId',protectRoute,getRecipeById)
router.delete('/delete/:recipeId',deleteRecipeById)
export default router