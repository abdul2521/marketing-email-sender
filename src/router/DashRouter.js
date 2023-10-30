const express = require("express");
const app = express()
const dRouter = express.Router();
const path = require("path");
const fs = require("fs");
const csv = require('csv-parser');
const cookieParser = require('cookie-parser');
dRouter.use(express.json()); // for parsing application/json
dRouter.use(express.urlencoded({ extended: true })); // for pa
dRouter.use(cookieParser());

const filePath = path.join(__dirname, "../tamplet/tamplet.csv");
dRouter.get("/tamplet", (req, res) => {
  res.download(filePath, 'template.csv');
})

const multer = require("multer"); // Import multer once
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public'); // Remove the leading /
  },
  filename: (req, file, cb) => {
    cb(null, 'myData.csv'); // Save the uploaded file as "myData.csv"
  },
});
dRouter.use(cookieParser());

const upload = multer({ storage });
app.use(express.static("public"));


const EmailSchema = require("../modle/emailsSchema")

dRouter.post("/readcsv", upload.single("file"), (req, res) => {
  const username = req.session.username;
  const useremail = req.session.useremail;
  if (!req.file) {
    return res.status(400).send('No file was uploaded.');
  }

  try {

    const results = [];

    fs.createReadStream('public/myData.csv')
      .pipe(csv())
      .on('data', (data) => {
        const email = data.emails;
        if (email) {
          results.push(email);
        }
      }
      )

      .on('end', () => {
        const emails = new EmailSchema({
          useremail: useremail,
          emailsarray: results
        })
        emails.save()

      });



    res.render("sendpage.hbs",{username,useremail})

  } catch (e) {
  }

});

dRouter.get("/readcsv", (req, res) => {
  res.render("sendpage.hbs")

})


const nodemailer = require("nodemailer")

// Create a Nodemailer transporter

dRouter.post("/send", async (req, res) => {
  const{subject,emailtamplet}=req.body
  const username = req.session.username;
  const useremail = req.session.useremail;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: useremail,
      pass: 'nietylejouazrajn',
    },
  });

  const userfind = await EmailSchema.findOne({ useremail: useremail})


  const email=userfind.emailsarray
  
  email.forEach((email) => {
    const mailOptions = {
      from: useremail,
      to: email,
      subject:subject,
      text:emailtamplet, 
    };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Email not sent:', error);
    } else {
      console.log('Email sent:', info.response);
      res.render("dashboard.hbs",{message:"the E-mails has been send ",username,useremail})
    }
  });
 
});
  
  
})


module.exports = dRouter;
