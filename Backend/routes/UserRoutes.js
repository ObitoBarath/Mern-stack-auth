import express from 'express'
import {authUser, updateUserProfile, registerUser, logoutUser, getUserProfile} from "../controller/UserController.js";
import {protect} from '../middleware/AuthMiddleware.js'
let router = express.Router()

router.post("/auth", authUser)
router.post("/", registerUser)
router.route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
router.post("/logout", logoutUser)


export default router