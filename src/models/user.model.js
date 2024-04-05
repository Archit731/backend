import mongoose, {Schema} from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type:String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,    //whenever u want searching to be optimised do this (a lil costly but useful) // bcz we want searching field enabled on it
        },
        email: {
            type:String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName:{
            type:String,
            required: true,
            trim: true,
            index: true,
        },
        avatar:{
            type:String,  //cloudinary url used
            required: true,
            unique: true,
        },
        coverImage: {
            type:String,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {timestamps: true}
)

userSchema.pre("save", function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})
 userSchema.methods.isPasswordCorrect = async function(password){  //we can inject as many fucntion we want 
    return await bcrypt.compare(password, this.password)  // will tell in true false if password matches or not
 }

 userSchema.methods.generateAccessToken = function(){
    return jwt.sign({  //payload(meaning data)
        _id: this._id,      //this has access of everything from db so thats why function used not arrow function
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY               //expiry always goes in object
    }
    )
 }
 userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({  //payload(meaning data)
        _id: this._id,      //this has access of everything from db so thats why function used not arrow function
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY               //expiry always goes in object
    }
    )
 }


export const User = mongoose.model("User", userSchema)