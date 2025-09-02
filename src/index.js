// require('dotenv').config({path: './env'})

import dotenv from "dotenv"

import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is runinng and the port is : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MOngo DB error", err);
})








//  1st approach
/*  
import express from "express"

const app = express()

;(async() => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error",(error) =>{
            console.log("ERRR: ",error);
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on PORT ${process.env.PORT}`);
        })

    }catch(error){
        console.error("ERROR",error)
        throw err
    }
})()
*/