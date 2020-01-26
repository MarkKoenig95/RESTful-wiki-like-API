require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

var port = process.env.PORT || 5000;

var databaseName = "wikiDB";
var globalMongoURL = `mongodb+srv://admin-mark:${process.env.PASSWORD}@cluster0-sdkut.mongodb.net/${databaseName}`;
var localMongoURL = `mongodb://localhost:27017/${databaseName}`;

mongoose.connect(localMongoURL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = new mongoose.model("Article", articleSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/////////////////////////////////////////////// Accessing all Data //////////////////////////////////////////////////////////////

app
  .route("/articles")
  .get((req, res) => {
    Article.find((err, articles) => {
      if (!err) {
        res.send(articles);
      } else {
        res.send(err);
      }
    });
  })
  .post((req, res) => {
    let article = new Article({
      title: req.body.title,
      content: req.body.content
    });

    article.save(err => {
      if (!err) {
        res.send("This will make a fine addition to my collection...");
      } else {
        res.send(err);
      }
    });
  })
  .delete((req, res) => {
    Article.deleteMany(err => {
      if (!err) {
        res.send("You BLEW IT UP!");
      } else {
        res.send(err);
      }
    });
  });

/////////////////////////////////////////////// Accessing specific Data //////////////////////////////////////////////////////////////

app
  .route("/articles/:articleTitle")
  .get((req, res) => {
    Article.findOne({ title: req.params.articleTitle }, (err, article) => {
      if (!err && article) {
        res.send(article);
      } else {
        if (!err) {
          res.send("There was no article matching that title");
        } else {
          res.send(err);
        }
      }
    });
  })
  .put((req, res) => {
    Article.update(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      err => {
        if (!err) {
          res.send("You have successfully updated this article!");
        } else {
          res.send(err);
        }
      }
    );
  })
  .patch((req, res) => {
    Article.update(
      { title: req.params.articleTitle },
      { $set: req.body },
      err => {
        if (!err) {
          res.send("You have successfully updated this article!");
        } else {
          res.send(err);
        }
      }
    );
  })
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.articleTitle }, err => {
      if (!err) {
        res.send("You have successfully deleted this article!");
      } else {
        res.send(err);
      }
    });
  });

app.route("/*").all((req, res) => {
  res.send(
    "Sorry, you have attempted to access an API route that is not set up."
  );
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
