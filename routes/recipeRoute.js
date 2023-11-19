import express from 'express'
import protectRoute from './../middleware/protectRoute.js';
import { addRecipe, deleteRecipeById, getAllRecipes, getRecipeById, getRecipesByUserId, likeUnlikeRecipe, likedRecipes, updateRecipeById } from '../controllers/recipeConroller.js';

const router= express.Router()

router.post('/create/:id',protectRoute,addRecipe)
router.get('/allrecipes',getAllRecipes)
router.get('/liked/:userId',protectRoute,likedRecipes)
router.get('/:id',protectRoute,getRecipesByUserId)
router.get('/detail/:recipeId',protectRoute,getRecipeById)
router.put('/update/:recipeId',protectRoute,updateRecipeById)
router.delete('/delete/:recipeId',deleteRecipeById)
router.post('/like/:recipeId',protectRoute,likeUnlikeRecipe)
export default router