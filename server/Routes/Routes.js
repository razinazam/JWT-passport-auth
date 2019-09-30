const express = require("express")
const routes = express.Router()
const Usermodel = require("../Models/RegisterSchema")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const JWT = require("jsonwebtoken")
routes.post("/register", async (req, res) => {
    const { name, email, pswd, pswd2 } = req.body;
    const error = []
    if (!name || !email || !pswd || !pswd2) {
        error.push({ msg: "Filled this field" })
        res.json(error)
    }
    if (pswd !== pswd2) {
        error.push({ msg: "password doset not match" })
    }
    if (pswd.length < 6) {
        error.push({ msg: "password must be 6 chracter" })
    }
    if (error.length != 0) {
        res.json(error)
    } else {
        let Hash = await bcrypt.hash(pswd2, 10)
        let newuser = new Usermodel({
            name: name,
            email: email,
            password: pswd,
            password2: Hash
        })
        newuser.save().then((res) => {
            console.log(res);
        }).catch((e) => {
            console.log("error", e);

        })
    }
})

routes.post("/Login", (req, res) => {
    const { email, pswd } = req.body

    Usermodel.findOne({ email }).then((user) => {
        console.log(user);
        console.log(pswd)
        bcrypt.compare(pswd, user.password2, (err, result) => {
            if (result == true) {
                const payload = {
                    id: user._id,
                    name: user.name
                }
                JWT.sign(payload, "config", (err, response) => {
                    if (err) {
                        res.status(500).json({
                            msg: "Token is invalid",
                            type: err
                        })
                    } else {
                        let token = {
                            token: `Bearer ${response}`
                        }
                        res.json(token).status(200)
                    }
                })
            } else {
                res.json("error");
                console.log("error")
            }

        })

    })

})

routes.get("/me", passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log("user", req);
    res.json({
        id: req.user.id,
        email: req.user.email,
        name: req.user.name
    })
})

// routes.post("/checktoken", (req, res) => {
//     Usermodel.findOne({ _id: req.body.id }).then((users) => {
//         res.json({
//             name: users.name,
//             email: users.email
//         })
//     })

// let user = await Usermodel.aggregate([
//     { $match: { id: "5d89f43ca1ec961754fdcbf6" } }
// ])
// console.log(user);
// })


module.exports = routes