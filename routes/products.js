const express = require("express");
const router = express.Router();

router.route("/products").get((req, res) => {
  res.render("product");
});

module.exports = router;
