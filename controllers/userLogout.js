const passport = require('passport');

module.exports = (req, res) => {
    req.logout();
    req.flash("sucess_msg", "Vous etes déconnecté");
    res.redirect("/user/login");
}