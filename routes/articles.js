const express = require("express");
const router = express.Router();
const app = express();
const bp = require("body-parser");
const articleData = require("../db/articles");
const knex = require("../database")

app.use(bp.json());

router
  .route("/articles")
  .get((req, res) => {
    articleData.getAllArticles().then((articles) => {
        console.log(articles);
        // console.log(process.env)
        res.render("index", { articles });
      });
  })
  .post((req, res) => {
    let newArr = articleData.storage.map(x => x.title);
    if (newArr.indexOf(req.body.title) === -1) {
      console.log(encodeURI(req.body.title));
      articleData.createNew(req.body);
      res.json("received!");
    } else {
      res.json("file already in storage!");
    }
  })
  .put((req, res) => {
    let newArr = articleData.storage.filter(x => x.title !== req.body.title);
    articleData.storage = newArr;
    articleData.createNew(req.body);
    console.log("storage", articleData.storage);
    res.json("you have put!");
  });

router
  .route("/articles/new")
  .get((req, res) => {
    res.render("new");
  })
  .post((req, res) => {
    if (
      req.body.title === "" ||
      req.body.body === "" ||
      req.body.author === ""
    ) {
      res.render("new", {
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        msg: "Please Fill All Fields"
      });
    } else {
      articleData.getAllArticles().map(x => x.title).then((articles) => {
        if (articles.indexOf(req.body.title) === -1) {
          let newArticleData = articleData.createNew(req.body)
          knex('articles').insert(newArticleData).then(() =>{
            res.redirect("/articles/" + req.body.title);
            res.json({success: true, message: 'ok'});
          })
        } else {
          res.render("new", {
            msg: "Article already exists, please edit to change!"
          });
        }
      })
    }
  });

router
  .route("/articles/:title")
  .get((req, res) => {
    articleData.getArticleByTitle(req.params.title).then((articles) => {
      console.log(articles)
      console.log('type of', typeof articles)
      console.log('title', articles[0].title);
      res.render("article", articles[0]);
    });
    // console.log(articles.title);
    // knex('articles').where('title',req.params.title).then((articles) => {
    //   console.log('articles', articles)
    // });
  })
  .put((req, res) => {
    const articleByTitle = articleData.getArticleByTitle(req.body.title);
    const articles = articleData.storage.filter(x => x !== articleByTitle);
    if (articleByTitle && req.params.title === req.body.title) {
      console.log("before Storage", articleData.storage);
      articleData.storage = articles;
      articleData.createNew(req.body);
      console.log("after Storage", articleData.storage);
      const newArticle = articleData.getDataByTitle(req.body.title);
      res.render("article", { newArticle });
    } else {
      res.json("The article does not exist!");
    }
  });

router.route("/articles/:title/delete").post((req, res) => {
  articleData.deleteArticle(req.params.title).then(()=>{
      res.redirect('/articles')
  })
  // const article = articleData.getDataByTitle(req.params.title);
  // if (article) {
  //   articleData.storage = articleData.storage.filter(x => x !== article);
  //   console.log(articleData.storage);
  //   res.redirect("/articles");
  // } else {
  //   res.json("The article does not exist in storage!");
  // }
});

router
  .route("/articles/:title/edit")
  .get((req, res) => {
    articleData.getArticleByTitle(req.params.title).then((articles) => {
      res.render("edit", articles[0]);
    });
  })
  .post((req, res) => {
    if (
      req.body.title === "" ||
      req.body.body === "" ||
      req.body.author === ""
    ) {
      res.render("edit", {
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
        msg: "Please fill out all Fields!"
      });
    } else {
      articleData.updateArticle(req.params.title, req.body).then((articles) => {
        console.log('Articles have been updated!!!!!')
        res.redirect("/articles/" + req.body.title);
        res.json({success: 'Article has been edited!', message: 'ok!'})
      })
      // const newStorage = articleData.storage.filter(
      //   x => x.title !== req.params.title
      // );
      // articleData.storage = newStorage;

      // articleData.createNew(req.body);
    }
  });

module.exports = router;
