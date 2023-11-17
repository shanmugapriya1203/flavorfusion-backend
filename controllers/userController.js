import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";

export const register= async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        const user= await User.findOne({
            $or:[{email},{username}]
        })
        if(user){
            return res.status(400).json({error:'User already exists'})
        }
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt)
        const newUser= new User({
            email:email,
            username:username,
            password:hashedPassword
        })
        await newUser.save()
        if(newUser){
            generateTokenAndSetCookie(newUser._id,res);
            res.status(201).json({ message: 'User registered successfully', user: newUser });
    
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
   
}
