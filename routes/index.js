var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user"); 

router.get("/", function(req, res){
    res.render("landing");
});

// ===============
// AUTH ROUTES
// ===============

//show register page
router.get("/register", function (req, res) {
    res.render("register")
});

//register post form
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    var pwd = req.body.password;
    User.register(newUser, pwd, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        });
    });
});

//show login
router.get("/login", function (req, res) {
    res.render("login");
});

//login post form
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {
});

//logout routes
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/campgrounds");
})

module.exports = router;