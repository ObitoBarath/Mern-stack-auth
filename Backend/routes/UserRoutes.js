import express from 'express'
import {authUser, updateUserProfile, registerUser, logoutUser, getUserProfile} from "../controller/UserController.js";
import {protect} from '../middleware/AuthMiddleware.js'

let router = express.Router()

router.post("/auth", authUser)//Login as the user with email and password
router.post("/", registerUser) // register new user
router.route("/profile")
    .get(protect, getUserProfile) // get users profile
    .put(protect, updateUserProfile) //update the users profile
router.post("/logout", logoutUser) // logout te users


export default router