import User from "../models/userModel.js";
import Recipe from './../models/RecipeModel.js';
export const addRecipe = async (req, res) => {
    try {
      const { name, description, ingredients, instructions, images, preparationTime, } = req.body;
      const userId = req.user._id;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const newRecipe = await Recipe.create({
        name,
        description,
        ingredients,
        instructions,
        images,
        preparationTime,
        createdBy: userId,
      });
  
      res.status(201).json(newRecipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  export const getAllRecipes = async (req, res) => {
    try {
      const recipes = await Recipe.find();
      res.status(200).json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  export const getRecipesByUserId= async(req,res)=>{
 try {
    const userId = req.user._id;
    const user= await User.findById(userId)
    if(!user){
        return res.status(404).json({error:'User Not Found'})
    }
    const recipes= await Recipe.find({createdBy:userId})
    res.status(200).json(recipes)
 } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });

 }
  }

  export const getRecipeById = async (req, res) => {
    try {
      const recipeId = req.params.recipeId;
      const recipe = await Recipe.findById(recipeId).exec();
  
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      res.json(recipe);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  export const updateRecipeById = async (req, res) => {
    try {
      const recipeId = req.params.recipeId;
      const { name, description, ingredients, instructions, images, preparationTime } = req.body;
  
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        recipeId,
        {
          name,
          description,
          ingredients,
          instructions,
          images,
          preparationTime,
        },
        { new: true }
      );
  
      if (!updatedRecipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      res.json(updatedRecipe);
    } catch (error) {
      console.error('Error updating recipe:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  export const deleteRecipeById=async(req,res)=>{
    try {
      const recipeId = req.params.recipeId
      const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
      if(!deletedRecipe){
        return res.status(404).json({ error: 'Recipe not found' });
      }
      return res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      console.error('Error deleting recipe:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }