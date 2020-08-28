module.exports = (req, res) => {
    res.render("home"
    , { user: req.user }
    )
}