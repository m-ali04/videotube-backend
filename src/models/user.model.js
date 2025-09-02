import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userModel = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    }, 
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname : {
        type: String,
        required: true,
        index: true
    },
    avatar : {
        type: String, //cloudnary url
        required: true,
    },
    coverImage: {
        type: String
    },
    watchHistory : {
        type: mongoose.Schema.ObjectId,
        ref: "Video"
    },
    password : {
        type: String,
        required: [true,"Password is required"],
    },
    refreshTokken : {
        type: String
    }
},{
    timestamps: true
})


// PASSWORD ENCRYTION CODE
userModel.pre("save",async function(next){
    if(this.isModified("password"))return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userModel.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password)
}

userModel.methods.generateAccessToken = function(){
    jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname : this,fullname
        
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userModel.methods.generateRefreshToken = function(){
      jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User",userModel)