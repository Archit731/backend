// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config({
  path: "./.env",
});
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      //these are listeners after connection //different listeners provided by on()
      console.log("express app ERROR: ", error); // database connected but maybe express app aint be able to talk
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });

//first approach everything written in index file (neatly written )
/*
import  express  from "express";            //app is also initialised here which is made by express
const app = express();

;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {            //these are listeners after connection //different listeners provided by on()
            console.log("ERROR: ", error)       // database connected but maybe express app aint be able to talk
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR: ", error)
        throw error
    }
})() 
*/
