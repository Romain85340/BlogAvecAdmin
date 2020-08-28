module.exports = (req, res) => {
    res.render("login", { user: req.user })
}