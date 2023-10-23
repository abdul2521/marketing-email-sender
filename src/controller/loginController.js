const userSchema = require("../modle/userSchema");
const bcrypt=require("bcrypt")



const signup = async (req, res) => {
  const { name, email, userpass } = req.body;

  try {
    // Check if a user with the same email already exists
    const existingUser = await userSchema.findOne({ email: email });

    if (existingUser) {
      // User with the same email already exists
      return res.render("index.hbs",{message:"user already exisit"});
    } else {
      // Create and save a new user

      const hashpass= await bcrypt.hash(userpass,8)
      const newUser = new userSchema({
        name: name,
        email: email,
        password: hashpass,
      });

      await newUser.save();
      res.render("index.hbs",{message:"sucessfully singup"})

    }
  } catch (error) {
    res.redirect("/signup",{messge:"invalid login"})
  }
};



const signin=async (req,res)=>{
    const{email,userpass}=req.body
    try{

        const finduser=await userSchema.findOne({email:email})
        if(!finduser){
            res.render("index.hbs",{message:"user not found"})
        }
        const compass=await bcrypt.compare(userpass,finduser.password)
        if(compass){
            res.render("dashboard.hbs")
        }
        else{
            res.render("index.hbs",{invalmessage:"invalid details"})

        }

    }catch(e){
        res.render("signup.hbs",{message:"User not Found signup here first"})
    }

}

module.exports = {
  signup,
  signin
};
