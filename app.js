const express = require("express");
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
require("ejs");
app.set('view engine', 'ejs');
const expressLayouts = require('express-ejs-layouts');

const homeController = require("./controllers/HomeController");
const userController = require("./controllers/UserController");
const foodController = require("./controllers/FoodController");

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://erbull:115177@selfcheck.lkyibum.mongodb.net/restaurant?retryWrites=true&w=majority")
.then(result => {console.log("veritabanına bağlandı.")});

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressLayouts);
app.use(session({
    secret: "merhaba",
    resave: false,
    saveUninitialized: true
}));

app.use(function(req, res, next){
    res.locals.user = {
        username: req.session.username,
        name: req.session.name,
        lastname: req.session.lastname,
    }    
    next();

})


app.use("/", homeController);
app.use("/user", userController);
app.use("/food", foodController);

app.listen(process.env.PORT, () => {
    console.log(`OrderFood, ${process.env.PORT} numapalı portta çalışıyor.`);
});
