import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from "../models/User-models.js";


const protect = asyncHandler(async (req, res, next) => {

    let tokens;

    tokens = req.cookies.jwt
    console.log("tokens ==> ", tokens)
    if (tokens) {
        try {

            let decode = jwt.verify(tokens, process.env.JWT_SECURE);
            req.user = await User.findById(decode.userId).select("-password")
            next()
        } catch (err) {
            res.status(401)
            throw new Error("Not Authorized Invalid User")
        }
    } else {
        res.status(401);
        throw  new Error("Not Authorized , No Tokens")
    }


})


export {protect}