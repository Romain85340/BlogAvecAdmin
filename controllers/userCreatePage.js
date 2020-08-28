module.exports = (req, res) => {
    res.render("createUser", { user: req.user })
}