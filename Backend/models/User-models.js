import mongoose from "mongoose";
import bcrypt from 'bcrypt'


const mongooseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},

}, {timestamps: true})

mongooseSchema.pre("save", async function (next) {
    console.log("this", this)
    if (!this.isModified("password")) {
        next()
    } else {
        const salt = await bcrypt.genSalt(10)
        console.log("before password", this.password)
        this.password = await bcrypt.hash(this.password, salt)
        console.log("after password", this.password)
    }
})
mongooseSchema.methods.matchPasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


let User = mongoose.model("User", mongooseSchema);


export default User
