var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();
var passport = require("passport");
var localStrategy = require("passport-local")
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seed");

//router requiring
var commentRoutes = require("./routes/comments");
var campgroundRouter = require("./routes/campgrounds");
var indexRouter = require("./routes/index");

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
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(indexRouter);
app.use(commentRoutes);
app.use(campgroundRouter);

app.get("*", (req, res) => res.send("<h1>PAGE NOT FOUND...............</h1>"));
app.listen(3000, () => console.log("The YelpCamp Server started!"));