const knex = require('../database')


class Articles {
  constructor() {
    // this.storage = knex.select().from('articles');
    // // this.initArticles();
  }
  //hello
  getAllArticles() {
    return knex.select().from("articles");
  }
  getArticleByTitle(inputTitle) {
    return knex.select().from("articles").where('title', inputTitle);
    // console.log('hello')
    // console.log('input',inputTitle);
    // let data = this.storage.map(x => x.title)
    // console.log(data)
    // // let data = this.storage.map(x => x.title).indexOf(inputTitle);
    // // let data = this.storage.map(x => x.title).indexOf(inputTitle);
    // // return this.storage[data];
    // return data
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
    newObj.url = encodeURI(data.title);
    return newObj;
    // this.storage.push(newObj);
    // console.log(this.storage);
  }

  updateArticle(selectTitle, data){
    return knex('articles').where('title', selectTitle).update({title: data.title, author: data.author, body: data.body, url: encodeURI(data.title)})
  }
  // initArticles() {
  //   this.storage.push({
  //     title: "Cats",
  //     author: "dallas m.",
  //     body: "cats are awesome"
  //   });
  //   this.idNum++;
  //   this.storage.push({
  //     title: "Dogs",
  //     author: "cari",
  //     body: "dogs are awesome"
  //   });
  //   this.idNum++;
  // }
}

module.exports = new Articles();
