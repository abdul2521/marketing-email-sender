const mongoose = require("mongoose")
require("../database")

const email = mongoose.Schema({
    useremail: {
        type: String,
        required: true
    },
    emailsarray: { type: [String], required: true }
})

const Emailschema = mongoose.model("Emailschema", email)


module.exports = Emailschema