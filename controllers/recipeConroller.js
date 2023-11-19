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