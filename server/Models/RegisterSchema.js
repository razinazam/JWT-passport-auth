const mongoose = require("mongoose")
const Schema = mongoose.Schema


const Registerdata = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    password2: { type: String }
})

module.exports = mongoose.model("UserData", Registerdata)