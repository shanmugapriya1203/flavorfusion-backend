import express from 'express'
import connectDB from './db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoute.js'
import recipeRoute from './routes/recipeRoute.js'
dotenv.config()
//Connect to MongoDb
connectDB()

const app= express()

//middleware
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/auth',authRoutes)
app.use('/api/recipe',recipeRoute)

app.get('/', (req, res) => {
    console.log('Home endpoint accessed');
   
    res.send('Welcome to the home endpoint!');
  });

const PORT= process.env.port || 8000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})