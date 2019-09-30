const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const path = require("path")
const app = express()
const cors = require("cors")
const Routes = require("./Routes/Routes")
const passport = require("passport")
app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, "../build")))
app.use(cors())
mongoose.connect("mongodb://Flash:1234@flash-shard-00-00-tkc35.mongodb.net:27017,flash-shard-00-01-tkc35.mongodb.net:27017,flash-shard-00-02-tkc35.mongodb.net:27017/test?ssl=true&replicaSet=Flash-shard-0&authSource=admin&retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => {
        console.log("db run");
    })


app.use("/registerdata", Routes)
app.use("/logindata", Routes)
app.use(passport.initialize())
require("./passport")(passport)

app.listen(8000, () => {
    console.log("server run 8000");

})