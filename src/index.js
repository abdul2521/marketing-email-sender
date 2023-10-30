const express = require('express');
const app = express();
const port = 3000;
const hbs = require('hbs');
const path = require('path');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

require("./middleware/auth")
require("./middleware/session")

app.use(express.json());
app.use(cookieParser());


require("./database")
// Set the view and partials paths

const viewspath = path.join(__dirname, './views');
const partialspath = path.join(__dirname, './views/partials');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', viewspath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialspath);

// Require the router module with the corrected name
const mainRouter = require("./router/mainrouter");

// Use the mainRouter
app.use(mainRouter);
const DRouter=require("./router/DashRouter")

app.use(DRouter)

app.listen(port, () => {
  console.log(`Server started. Access the website at: http://localhost:${port}`);
});
