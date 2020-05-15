var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// ===============
// COMMENTS ROUTES
// ===============

router.get("/campgrounds/:id/comments/new", isLoggedIn ,function (req, res) {
    //find campgrounds by ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    });
});

//Comments create
router.post("/campgrounds/:id/comments", isLoggedIn ,function (req, res) {
    //lookup compground using ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            var text = req.body.comment;
            console.log(text);

            //create new comment
            Comment.create(text, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // add username and id to comment
                    Console.log("New comment's usernmae will be: " + req.user);
                    // save commment
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    });
})

//meddleware loggin check
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("User logged in successfully");
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;