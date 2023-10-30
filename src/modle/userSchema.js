const express=require("express")
const mongoose=require("mongoose")




const data=mongoose.Schema({
    name:{type:String},
    email:{
        type:String,
        required:true
    }
})

const Users=mongoose.model("User",data)

module.exports=Users