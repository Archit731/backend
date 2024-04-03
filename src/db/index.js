import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      //we can hold the response we getting after the connection as mongoose return an object
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`\n MongoDB connected !! DB HOST: 
        ${connectionInstance.connection.host}`); //to check what if we got connected to another server as database for production, developing are different so we know which host we are connected to
  } catch (error) {
    console.log("MONGODB connection FAILED", error);
    process.exit(1); //process is given by node.js and it is the refernce of that process in which our currrent application is running
  }
};

export default connectDB;
