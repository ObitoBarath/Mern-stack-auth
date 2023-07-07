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
            let newVar = await User.findById(decode.userId).select("-password");
            console.log("new var ==> current logged in user  ==", newVar)
            let {name, email, _id} = newVar
            console.log("name and email ==>", name, email)
            req.user = {name, email, _id}
            next();
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