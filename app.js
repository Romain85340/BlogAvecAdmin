///////// DEPENDANCE ////////////////////
const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require('mongoose');
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");



// Express
const app = express();

// MongoDB
const db = require("./config/keys").MongoURI;

// Passport local config
require("./config/passport")(passport)

// Passport google config
require("./config/keys")
require("./config/googlePassport")()


// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connecté !')) 
    .catch(err => console.log(err));

// Express static
app.use(express.static("static"));

// Set templating
app.use(expressLayouts)
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Bodyparser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(session({
    secret: 'securité',
    name: "cookie",
    resave: true,
    saveUninitialized: true,
  }))

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Connect flash
  app.use(flash());

  // Variable Global
  app.use((req, res, next) => {
      res.locals.success_msg = req.flash("success_msg");
      res.locals.error_msg = req.flash("error_msg");
      res.locals.error = req.flash("error");
      next();
  })





/////////// CONTROLLERS ///////////////


// Home
const getHomePage = require("./controllers/homePage");

// User
const userCreatePage = require("./controllers/userCreatePage")
const userLogin = require("./controllers/userLoginGet")
const userLogout = require("./controllers/userLogout")
const userLoginAuth = require("./controllers/userLoginPost")
const userRegister = require("./controllers/userRegister")

// Article
const addArticle = require("./controllers/addArticle")

// Categorie
const getCategorie = require("./controllers/categorieGet")






/////////// ROUTES //////////////////


// Home
app.get("/", getHomePage);

// User
app.get("/user/create", userCreatePage)
app.post("/user/register", userRegister)
app.get("/user/login", userLogin)
app.post("/user/loginAuth", userLoginAuth)
app.get("/user/logout", userLogout)
app.get("/auth/google", passport.authenticate('google', { scope: ['profile'] }))
app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
        res.redirect('/');
  });

// Article
app.get("/article/create", addArticle)

// Categorie
app.get("/categorie", getCategorie)






/////////// SERVEUR /////////////////


app.listen("1996", function(){
    console.log("le serveur écoute le port 1996");
})





///////////// fichiers keys.js a crée dans le dossier config  //////////////////////


//     MongoURI = Connection a la base de donnée mongoDB
//     GOOGLE_CLIENT_ID = Id client pour utilisé passport google
//     GOOGLE_CLIENT_SECRET = Password client pour utilisé passport google