var bodyParser = require("body-parser");
var express = require("express");
var app = express();

var campgrounds = [
    { name: "Salmon Creek", image: "https://www.photosforclass.com/download/pixabay-3893587?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c73287ad29f49cc5b_960.jpg&user=fgmsp" },
    { name: "Granite Hill", image: "https://www.photosforclass.com/download/pixabay-2650359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c73287ad29f49cc5b_960.jpg&user=piviso" },
    { name: "Mountain Goat's Rest", image: "https://www.photosforclass.com/download/pixabay-1149402?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c73287ad29f49cc5b_960.jpg&user=Free-Photos" },
    { name: "Salmon Creek", image: "https://www.photosforclass.com/download/pixabay-3893587?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c73287ad29f49cc5b_960.jpg&user=fgmsp" },
    { name: "Granite Hill", image: "https://www.photosforclass.com/download/pixabay-2650359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c73287ad29f49cc5b_960.jpg&user=piviso" },
    { name: "Mountain Goat's Rest", image: "https://www.photosforclass.com/download/pixabay-1149402?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c73287ad29f49cc5b_960.jpg&user=Free-Photos" },
    { name: "Salmon Creek", image: "https://www.photosforclass.com/download/pixabay-3893587?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c73287ad29f49cc5b_960.jpg&user=fgmsp" },
    { name: "Granite Hill", image: "https://www.photosforclass.com/download/pixabay-2650359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c73287ad29f49cc5b_960.jpg&user=piviso" },
    { name: "Mountain Goat's Rest", image: "https://www.photosforclass.com/download/pixabay-1149402?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c73287ad29f49cc5b_960.jpg&user=Free-Photos" },
];

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name: name, image: image };
    campgrounds.push(newCampground);
    res.redirect("campgrounds");
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});

app.get("*", (req, res) => res.send("<h1>PAGE NOT FOUND...............</h1>"));
app.listen(3000, () => console.log("The YelpCamp Server started!"));