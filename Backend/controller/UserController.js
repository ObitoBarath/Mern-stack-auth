import asyncHandler from "express-async-handler";
import User from "../models/User-models.js";
import generateTokens from "../utills/GenerateTokens.js";
//@desc Auth user
//routes POST /api/users/auth
//@access public
const authUser = asyncHandler(async (req, res) => {


    const {email, password} = req.body


    console.table({email, password})
    let user = await User.findOne({email});


    if (user && await user.matchPasswords(password)) {
        generateTokens(res, user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(401).json("Invalid User")
    }


})

//@desc Register user
//routes POST /api/users/
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    console.table({name, email, password})


    let userExist = await User.findOne({email});
    console.log("userExist ==> ", userExist)

    if (userExist) {
        res.status(400)
        throw  new Error("User Already exist")
    }

    let user = await User.create({
        name, email, password
    });


    if (user) {
        generateTokens(res, user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })

    } else {
        res.status(400)
        throw new Error("Invalid User Data")
    }

})


//@desc Logout user
//routes POST /api/users/logout
//@access public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expiresIn: new Date(0)
    })
    res.status(200).json({message: " User Logout User"})
})


//@desc Get User Profile
//routes GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
     res.status(200).json({message: "User Profile"})
});

//@desc Auth user
//routes PUT  /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {


    res.status(200).json({message: "Update User profile "})
})

export {authUser, getUserProfile, logoutUser, registerUser, updateUserProfile}
