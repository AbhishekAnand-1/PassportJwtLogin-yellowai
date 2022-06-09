const express = require('express');
const app = express();
const cors = require('cors');
const { hashSync, compareSync } = require('bcrypt');
const UserModel = require('./config/database');
const jwt = require('jsonwebtoken');
const passport  = require('passport');

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors());
app.use(passport.initialize());
require('./config/passport');

app.post('/register', (req, res)=>{
    const user = new UserModel({
        username : req.body.username,
        password : hashSync(req.body.password, 10)
    })
    user.save().then(user =>{
        res.send({
            success: true,
            message: "User registerd successfully",
            user: {
                id : user._id,
                username : user.username,
            }
        })
    }).catch(err => {
        res.send({
            success: false,
            message: "Something went wrong",
            error: err.message
        })
    })
})

app.post('/login', (req, res)=>{
    UserModel.findOne({username: req.body.username}).then(user=>{
        if(!user){
            return res.status(401).send({
                success: false,
                message: "User not found"
            })
        }

        if(!compareSync(req.body.password, user.password)){
            return res.status(401).send({
                success: false,
                message: "Username or password incorrect"
            })
        }

        const payload = {
            username : user.username,
            id : user._id 
        }
        const token = jwt.sign(payload, "rtyRuuhjyGHjJ", {expiresIn : "10"})
            return res.status(200).send({
            success: true,
            message: "Logged in successfully",
            token: "Bearer " + token
            })
    })
})

app.get('/protected', passport.authenticate('jwt', {session: false}), (req, res)=>{
    return res.status(200).send({
        success: true,
        user: {
            id: req.user._id,
            username: req.user.username
        }
    })
})
app.listen(5000,() => console.log("Listening port on 5000"));