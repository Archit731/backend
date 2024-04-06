import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //req is coming from user all json data and if file is also coming then multer works on file as express dont work on file and we have configured express for our json data
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) // thjis just add a unique suffix to filenames
    //   cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, file.originalname); //originalname the name of file saved by user and is uploaded
    //bug chances if a file with same name comes it might overrwrite the file already existing so
    //but we are just saving the file for small amount of time and then uploading on cloudinary
  },
});

export const upload = multer({ storage });
