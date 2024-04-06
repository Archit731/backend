import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null; //can also return a message saying could not find the file path
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // detect automatically the file type coming
    });
    //file has been uploaded sucessfully
    console.log("file is uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    //since we already have a localfilepath that means file is on our server but since it failed on uploading then we should remove it from our server too to not have malicious files on our server
    fs.unlinkSync(localFilePath); //sync used bcz aisa hona hi chaie ye kaam uske baad we move further
    //removes the locally saved temporary file as the upload operation got failed
    return null;
  }
};
export { uploadOnCloudinary };
