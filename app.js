const path = require("path");
const fs = require("fs");
const express = require("express");

const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render('index');
});

app.get("/about", function (req, res) {
    res.render('about');
});
app.get("/confirm", function (req, res) {
    res.render('confirm');
});
app.get("/recommend", function (req, res) {
    res.render('recommend');
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body; //extract data filled in form in /recommend file(JSON type)

  //get the absoulte path and read the content of that file with the object(PATH) returned(filePath)
  const filePath = path.join(__dirname, "data", "restaurants.json"); //get the path of destination json file where we are going to push all the data we extracted from req.body
  const fileData = fs.readFileSync(filePath); //read the already present data(empty text) in json file

  const storedRestaurants = JSON.parse(fileData); //since fileData is simply a JSON string we need to parse that into js object

  storedRestaurants.push(restaurant); //push the body into the json file in form of js object
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants)); // this will again convert js object into JSON string

  res.redirect("/confirm");
});
app.get("/restaurants", function (req, res) {

    const filePath = path.join(__dirname, "data", "restaurants.json");
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    res.render('restaurants', {numberOfRestaurants: storedRestaurants.length, restaurants:storedRestaurants});
});

app.listen(3000);
