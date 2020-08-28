module.exports = (req, res) => {
    res.render("categoriePage", { user: req.user })
}