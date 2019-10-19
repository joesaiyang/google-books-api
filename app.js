//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

const request = require('request');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
  res.render("index");
});

app.post("/", function(req, res){

  //console.log(req.body.newSearch);
  const search = req.body.newSearch;
  const orderBy = req.body.orderBy;
 

  var options = {
    url: "https://www.googleapis.com/books/v1/volumes",
    method: "GET",
    qs: {
      q: search,
      orderBy: orderBy,
    }
  }

  request(options, function (error, response, body){

    var data = JSON.parse(body);
    
    console.log(options);
    for (var i = 0; i < data.items.length; i++) {
      var author = data.items[i].volumeInfo.authors;

      var title = data.items[i].volumeInfo.title;
      var totalItems = data.totalItems
      console.log(body);
      
    }
    
  }) 

 
});


app.listen(3000, function(){
  console.log("Server started on port 3000");
});