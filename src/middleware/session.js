const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app=express()
// ...

app.use(session({
    secret: 'thisismysecretkeyforsessionsadnfkjsf', // Replace with a strong, secret key
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.initialize())


module.exports=app