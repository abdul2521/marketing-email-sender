const express = require('express');
const mainRouter = express.Router();
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const User=require("../modle/userSchema")
const cookieParser = require('cookie-parser');
// Define GoogleStrategy and Passport configuration
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: '1011184896532-rujq6aq7vibcj2036qigsjk8u36la3rh.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Configure session and initialize Passport
mainRouter.use(session({
  secret: 'thisismysecretkeyforsessionsadnfkjsf',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Change this to true for HTTPS
}));
mainRouter.use(passport.initialize());
mainRouter.use(passport.session());

mainRouter.use(express.static(path.join(__dirname, "public")));

// Define your routes
mainRouter.get('/', (req, res) => {
  res.render('index.hbs');
});
mainRouter.get("/dashboard",async(req,res)=>{
  if(req.isAuthenticated()){
    const user=req.user
    const username=user.displayName
    const useremail = user.emails[0].value;
    req.session.username =username
    req.session.useremail =useremail

    res.cookie=(username,useremail,{httpOnly: true })

    const newuser=await User.findOne({email:useremail})
    if(newuser){
    
      res.render("dashboard.hbs",{username,useremail})    }else{
      const addUser=new User({
        name:username,
        email:useremail
      })
      addUser.save()
      res.render("dashboard.hbs",{username,useremail})
      
    }
  }else{
    res.redirect("/")
  }
})

mainRouter.get('/auth/google', passport.authenticate('google', { scope: ["email", "profile"] }));

mainRouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), async(req, res) => {
  res.redirect("/dashboard")
  
});




module.exports = mainRouter;
