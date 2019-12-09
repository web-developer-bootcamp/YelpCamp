var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX - show all campgrounds
router.get("/campgrounds", function (req, res) {
    console.log(req.user)
    //Get all data from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/campgrounds", { campgrounds: allCampgrounds});
        }
    });
});

//CREATE - add new campground
router.post("/campgrounds", function (req, res) {
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
router.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
});

//SHOW - show more information about one campground
router.get("/campgrounds/:id", function (req, res) {
    //find the campground with provided ID

    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function (err, campgroundInfo) {
        if (err) {
            console.log(err);
        } else {
            console.log(campgroundInfo)
            res.render("campgrounds/show", { campground: campgroundInfo });
        }
    });
});

module.exports = router;