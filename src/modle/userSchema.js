const express=require("express")
const mongoose=require("mongoose")




const data=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Users=mongoose.model("User",data)

module.exports=Users