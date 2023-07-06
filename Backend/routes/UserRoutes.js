import express from 'express'
import {authUser, updateUserProfile, registerUser, logoutUser, getUserProfile} from "../controller/UserController.js";

let router = express.Router()

router.post("/auth", authUser)
router.post("/", registerUser)
router.route("/profile").get(getUserProfile).put(updateUserProfile)
router.post("/logout", logoutUser)


export default router