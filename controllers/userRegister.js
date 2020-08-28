const User = require("../models/User");
const bcrypt = require("bcrypt");
// const passport = require('passport');

module.exports = (req, res) => {

    const { name, email, password, password2 } = req.body;

    let errors = [];

    // Tous les champs doivent etre rempli
    if(!name || !email || !password || !password2) {
        errors.push({ msg: "Remplissez tous les champs"})
    }

    // Mot de passe identique
    if(password !== password2){
        errors.push({ msg: "Les mots de passe ne sont pas identique"})
    }

    // Verifie la longueur du mot de passe
    if(password.length < 6){
        errors.push({ msg: "Le mot de passe n'est pas assez long"})
    }

    // Erreur enregistrement ou validé
    if(errors.length > 0){
        res.render("createUser", {errors, name, email, password, password2, user: req.user})
    } else {
        // Validation faite
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                    // User existant
                    errors.push({ msg: " Email existe déja "})
                    res.render("createUser", {errors, name, email, password, password2, user: req.user})
                } else { 
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {

                            if(err) throw err;

                            // Definir le mot de passe hashé
                            newUser.password = hash;
                            // Save user
                            newUser.save()
                                .then(user => {
                                    req.flash("success_msg", "Vous etes enregistrer, vous pouvez vous connecté");
                                    res.redirect("/user/login")
                                })
                                .catch(err => console.log(err));
                    }))
                }
            });
    }
}

