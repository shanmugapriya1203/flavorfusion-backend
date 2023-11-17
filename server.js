import express from 'express'
import connectDB from './db.js'
import dotenv from 'dotenv'

dotenv.config()

connectDB()

const app= express()
app.use(express.json())

const PORT= process.env.port || 8000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})