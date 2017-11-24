var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    var campgrounds = [
      {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},  
      {name: "Granite Hill", image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg"},  
      {name: "Mountain Goat Rest", image: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg"}  
    ];
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server has started...");
});