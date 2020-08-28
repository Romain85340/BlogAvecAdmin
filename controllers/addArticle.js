module.exports = (req, res) => {
    res.render("createArticle", { user: req.user })
}