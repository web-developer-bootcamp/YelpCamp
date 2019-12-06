var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();
var passport = require("passport");
var localStrategy = require("passport-local")
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seed");
var User = require("./models/user");

seedDB();

//mongoose
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true }); // mongoDB connection
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.get("", function (req, res) {
    res.render("landing");
});

//passport config
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
    Campground.findById(id).populate("comments").exec(function (err, campgroundInfo) {
        if (err) {
            console.log(err);
        } else {
            console.log(campgroundInfo)
            res.render("campgrounds/show", { campground: campgroundInfo });
        }
    });
});

// ===============
// COMMENTS ROUTES
// ===============

app.get("/campgrounds/:id/comments/new", function (req, res) {
    //find campgrounds by ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    });
})

app.post("/campgrounds/:id/comments", function (req, res) {
    //lookup compground using ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            var text = req.body.comment;
            console.log(text);

            //create new comment
            //connect new comment to compground
            //redirect campground show page
            Comment.create(text, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    });
})

// ===============
// AUTH ROUTES
// ===============

//show register page
app.get("/register", function (req, res) {
    res.render("register")
});

//register post form
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    var pwd = req.body.password;
    User.register(newUser, pwd, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        })
    })
});

//show login
app.get("/login", function(req, res){
    res.render("login");
});

//login post form
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {
});

app.get("*", (req, res) => res.send("<h1>PAGE NOT FOUND...............</h1>"));
app.listen(3000, () => console.log("The YelpCamp Server started!"));