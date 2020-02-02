const db = require("../models");

module.exports = function (app) {
    // Load index page
    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("/saved", function (req, res) {
        db.Article.find({ saved: true }, { _id: 0 }).then(function (found) {
            console.log(found);
            let postsObj = {
                article: found
            }
            res.render("saved", postsObj);
        });
    });

    app.get("/savedarticle/notes/:id", function (req, res) {
        let articleId = req.params.id

        db.Article.find({ articleId: articleId }, { _id: 0 }).then(function (found) {

            res.render("notes", found[0]);
        });

    });
}  