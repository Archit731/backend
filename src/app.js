import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true

}))

app.use(express.json({limit: "16kb"})) //for json se data aana
app.use(express.urlencoded({extended: true, limit: "16kb"}))  //use of extended is to give objects inside objects 
app.use(express.static("public")) //for any file pdf that comes and to store them in server like public assets so any can see and access
app.use((cookieParser()))



export { app }