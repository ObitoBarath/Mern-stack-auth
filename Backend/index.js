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

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log("Server is running in port", PORT)
})