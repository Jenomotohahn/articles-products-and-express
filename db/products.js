class Products {
  constructor() {
    this.storage = [];
    this.idNum = 1;
    this.initProds();
  }
  getStorage() {
    return this.storage.slice();
  }
  getProductById(prodId) {
    let productById = this.storage.map(x => x.id).indexOf(prodId);
    return this.storage[productById];
  }
  createNewProd(data) {
    this.idNum++;
    let newObj = {};
    newObj.id = this.idNum;
    newObj.name = data.name;
    newObj.price = data.price;
    newObj.inventory = parseInt(data.inventory, 10);
    this.storage.push(newObj);
    console.log(this.storage);
  }
  initProds() {
    console.log(this.idNum);
    this.storage.push({
      id: this.idNum,
      name: "watermelon",
      price: "$5.00",
      inventory: 10
    });

    this.idNum++;
    this.storage.push({
      id: this.idNum,
      name: "natto",
      price: "$2.00",
      inventory: 100
    });
    console.log(this.storage);
  }
}
module.exports = new Products();
