import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar", // name the filed as avatar in frontend
      maxCount: 1,
    }, //object -1 avatar image
    {
      name: "coverImage",
      maxCount: 1,
    }, // object-2 cover image
  ]),
  registerUser
);

export default router;
