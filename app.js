var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();
var Campground = require("./models/campground");
var seedDB = require("./seed");

//seedDB();

//mongoose
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true }); // mongoDB connection
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("", function (req, res) {
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function (req, res) {
    //Get all data from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/campgrounds", { campgrounds: allCampgrounds });
        }
    });
});

//CREATE - add new campground
app.post("/campgrounds", function (req, res) {
    //create new Campground and save to DB
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = { name: name, image: image, description: description };

    Campground.create(newCampground, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("campgrounds/campgrounds");
        }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
});

//SHOW - show more information about one campground
app.get("/campgrounds/:id", function (req, res) {
    //find the campground with provided ID

    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, campgroundInfo){
        if(err){
            console.log(err);
        }else{
            console.log(campgroundInfo)
            res.render("campgrounds/show", {campground: campgroundInfo});
        }
    });
});

// ===============
// COMMENTS ROUTES
// ===============

app.get("/campgrounds/:id/comments/new", function(req, res){
    res.render("comments/new");
})

app.get("*", (req, res) => res.send("<h1>PAGE NOT FOUND...............</h1>"));
app.listen(3000, () => console.log("The YelpCamp Server started!"));