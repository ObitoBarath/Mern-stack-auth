import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected successfully")
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
export default connectDb;