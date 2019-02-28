class Articles {
  constructor() {
    this.storage = [];
    this.initArticles();
  }
  //hello
  getStorage() {
    return this.storage.slice();
  }
  getDataByTitle(inputTitle) {
    let data = this.storage.map(x => x.title).indexOf(inputTitle);
    return this.storage[data];
  }
  getDataIndexNum(inputTitle) {
    let num = this.storage.map(x => x.title).indexOf(inputTitle);
    return num;
  }
  createNew(data) {
    let newObj = {};
    newObj.title = data.title;
    newObj.body = data.body;
    newObj.author = data.author;
    newObj.urlTitle = encodeURI(data.title);
    this.storage.push(newObj);
    console.log(this.storage);
  }
  initArticles() {
    this.storage.push({
      title: "Cats",
      author: "dallas m.",
      body: "cats are awesome"
    });
    this.idNum++;
    this.storage.push({
      title: "Dogs",
      author: "cari",
      body: "dogs are awesome"
    });
    this.idNum++;
  }
}

module.exports = new Articles();
