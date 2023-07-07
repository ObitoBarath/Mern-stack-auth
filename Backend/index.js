import express from 'express'
import {config} from "dotenv";
import cookieParser from 'cookie-parser'
import userRoutes from './routes/UserRoutes.js'
import {notFound, errorHandler} from "./middleware/ErrorMiddleware.js";
import connectDb from "./Config/Db.js";

config({path: ".env"})

await connectDb();
let app = express()

let PORT = process.env.PORT;

//Major middlewares
app.use(express.urlencoded({extended: true}))//TO PARSE DATA OF X-WWW-FORM-URLENCODED VALUES
app.use(express.json())//to parse the json format values
app.use(cookieParser())//to perform some actions with the cookies

app.use('/api/users', userRoutes)
app.use(notFound)//for not configured url requests
app.use(errorHandler) // for sending error to postman


app.listen(PORT, () => {
    console.log("Server is running in port", PORT)
})