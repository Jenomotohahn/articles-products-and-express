const express = require("express");
const exhbs = require("express-handlebars");
const app = express();
const PORT = 8080;
const path = require("path");
const bp = require("body-parser");
const products = require("./routes/products");
const articles = require("./routes/articles");
const knex = require("./database")

const productData = require("./db/products");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.engine(
  "hbs",
  exhbs({
    defaultLayout: "main",
    extname: "hbs"
  })
);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("home");
});
app.use("/", products);
app.use("/", articles);

app.listen(PORT, () => {
  console.log("Port is open on port " + PORT);
});
