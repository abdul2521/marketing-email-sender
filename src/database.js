const mongoose=require("mongoose")
const dburl="mongodb+srv://admin:admin@cluster0.rzmww3r.mongodb.net/";
mongoose.connect(dburl,{useNewUrlParser: true,
    useUnifiedTopology: true,}).then(console.log("database is connected")).catch("databse is not connected")


