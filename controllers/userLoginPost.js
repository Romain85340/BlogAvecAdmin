const passport = require('passport');
require("../config/passport")(passport);
require("../controllers/userRegister");



module.exports = (req, res, next) => {
    passport.authenticate("local", { 
        successRedirect: "/",
        failureRedirect: "/user/login",
        failureFlash: true,
    })(req, res, next);
}