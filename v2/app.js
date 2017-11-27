var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
//         description: "This is a huge granite hill. No bathrooms, no water, just beautiful granite!"
        
//     }, function(err, campground) {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             console.log("Created campground:")
//             console.log(campground);
//         }
//     });

app.get("/", function(req, res) {
    res.render("landing");
});

// INDEX ROUTE - show campgrounds in DB
app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, campgrounds) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("campgrounds", {campgrounds: campgrounds});
        }
    });
});

// CREATE ROUTE - add new campground to DB
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Added campground:");
            console.log(newlyCreated);
            res.redirect("campgrounds");
        }
    });
});

// NEW ROUTE - show form
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

// SHOW ROUTE - show campground given ID
app.get("/campgrounds/:id", function(req, res) {
    // Find campground with procided ID
    // Render show template with that campground
    res.send("This will be the showpage one day...");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server has started...");
});