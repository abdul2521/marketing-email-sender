// mainrouter.js
const mongoose=require("mongoose")
const express = require('express');
const mainRouter = express.Router();


const loginController=require("../controller/loginController")

mainRouter.get('/', (req, res) => {
  res.render('index.hbs');
});


mainRouter.post("/login",loginController.signin)

mainRouter.get("/signup",(req,res)=>{
  res.render("signup.hbs")
})
mainRouter.post("/signup",loginController.signup)


module.exports = mainRouter;
