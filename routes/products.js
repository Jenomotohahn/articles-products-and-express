const express = require("express");
const router = express.Router();
const productData = require("../db/products");

router.route("/products").get((req, res) => {
  const products = productData.storage;
  res.render("indexProd", { products });
});

router
  .route("/products/new")
  .get((req, res) => {
    res.render("newProd");
  })
  .post((req, res) => {
    const products = productData.storage;
    const checkStorageId = products.map(x => x.id);
    const checkStorageName = products.map(x => x.name);
    if (
      req.body.name === "" ||
      req.body.id === "" ||
      req.body.price === "" ||
      req.body.inventory === ""
    ) {
      res.render("newProd", { msg: "Please fill in all fields!" });
    } else if (checkStorageId.indexOf(req.body.id) !== -1) {
      res.render("newProd", { msg: "Product Id Already Exists" });
    } else if (checkStorageName.indexOf(req.body.name) !== -1) {
      res.render("newProd", { msg: "Product Name Already Exists" });
    } else {
      productData.createNewProd(req.body);
      res.redirect("/products");
    }
  });
router
  .route("/products/:id")
  .get((req, res) => {
    console.log(parseInt(req.params.id, 10));
    const product = productData.getProductById(parseInt(req.params.id, 10));
    res.render("product", { product });
  })
  .post((req, res) => {
    console.log("before", productData.storage);
    let newStorage = productData.storage.filter(
      x => x.id !== parseInt(req.params.id)
    );
    productData.storage = newStorage;
    console.log("after", productData.storage);
    res.redirect("/products");
  });

router
  .route("/products/:id/edit")
  .get((req, res) => {
    res.render("editProd", req.body);
  })
  .post((req, res) => {
    
  });

module.exports = router;
