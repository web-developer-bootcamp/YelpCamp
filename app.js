var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();
var Campground = require("./models/campground");
var seedDB = require("./seed");

seedDB();

//mongoose
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true }); // mongoDB connection
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");
});

//CREATE DB Values
/*
Campground.create(
    {
        name: "Granite Hill",
        image: "https://www.photosforclass.com/download/pixabay-1149402?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c73287ad29f49cc5b_960.jpg&user=Free-Photos",
        description: "This is a huge granite hill, no bathroom. No water. Beautiful granite!"
    },
    function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("NEW Campground created!");
            console.log(campground);
        }
    }
)*/

//INDEX - show all campgrounds
app.get("/campgrounds", function (req, res) {
    //Get all data from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds", { campgrounds: allCampgrounds });
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
            res.redirect("campgrounds");
        }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});

//SHOW - show more information about one campground
app.get("/campgrounds/:id", function (req, res) {
    var id = req.params.id;

    Campground.findById(id, function(err, campgroundInfo){
        if(err){
            console.log(err);
        }else{
            res.render("show", {campground: campgroundInfo});
        }
    });
});

app.get("*", (req, res) => res.send("<h1>PAGE NOT FOUND...............</h1>"));
app.listen(3000, () => console.log("The YelpCamp Server started!"));