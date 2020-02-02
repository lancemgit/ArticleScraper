const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        let arrResults = [];
        axios("https://www.investing.com/news/").then((response) => {
            // Loading Cheerio with the HTML document from the given website
            let $ = cheerio.load(response.data);
            $("#latestNews").children().children().each(function (i, element) {
                let results = {};

                results.articleId = $(element).attr("data-id");
                results.articleLink = "https://investing.com" + $(element).find(".img").attr("href");
                results.articleImg = $(element).find("img").attr("src");
                results.articleTitle = $(element).find(".title").text();
                results.articleDescription = $(element).find("p").text();


                if (results.articleId) {
                    arrResults.push(results);

                    db.Article.find({ articleId: results.articleId }).then(function (found) {
                        if (found.length === 0) {
                            db.Article.create({
                                title: results.articleTitle,
                                img: results.articleImg,
                                link: results.articleLink,
                                articleId: results.articleId,
                                description: results.articleDescription
                            });
                        }
                    });
                }
            });

            res.json(arrResults);
        });
    });

    app.get("/save/:id", function (req, res) {
        const articleId = req.params.id;
        db.Article.update({ articleId: articleId }, { $set: { saved: true } }).then(function (updated) {
            res.json(updated);
        });
    });

    app.get("/unsave/:id", function (req, res) {
        const articleId = req.params.id;
        console.log("something");
        db.Article.update({ articleId: articleId }, { $set: { saved: false } }).then(function (updated) {
            res.json(updated);
        });
    });

    app.post("/note/:id", function (req, res) {
        const articleId = req.params.id;
        db.Comment.create({ body: req.body.body }).then(function (created) {
            const noteId = created._id;
            db.Article.findOneAndUpdate({ articleId: articleId }, { $push: { comment: noteId } }).then(function (updated) {
                res.json(updated);
            });
        });
    });

    app.get("/getnotes/:id", function (req, res) {
        const articleId = req.params.id;
        db.Article.find({ articleId: articleId }).populate("comment").then(function (comments) {
            res.json(comments);
        });
    });
}
