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

export const login=async(req,res)=>{
    try {
        const{email,password}=req.body;
        const user= await User.findOne({email})
        if(!user || (!await bcrypt.compare(password,user.password))){
            return res.status(400).json({error:'Invalid email or password'})
        }
        const token= generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id:user._id,
            username:user.username,
            email:user.email,
            token
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error in loginUser:', error.message);
    }
}

export const updateUser=async(req,res)=>{
try {
    const {username,email,password}=req.body
    const userId= req.user._id
    const user= await User.findById(userId)
    if(!user){
        return res.status(404).json({error:'User not found'})
    }
    if(username){
        user.username=username
    }
    if (email) {
        user.email = email;
      }
      if(password){
        const salt= await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt)
        user.password=password
      }
      await user.save();
      const token= generateTokenAndSetCookie(user._id,res)
      res.status(200).json({
        _id:user._id,
        username:user.username,
        email:user.email,
        token
      });
} catch (error) {
    console.error(error)
    res.status(500).json({error:'Internal server error'})
}
}