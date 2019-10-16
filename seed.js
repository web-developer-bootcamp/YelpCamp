var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
    {
        name: "Clound's Rest",
        image: "https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242_960_720.jpg",
        description: "Text content 1"
    },
    {
        name: "Desert Mesa",
        image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_960_720.jpg",
        description: "Text content 2"
    },
    {
        name: "Canyon Floor",
        image: "https://cdn.pixabay.com/photo/2019/10/03/11/14/camp-4522970_960_720.jpg",
        description: "Test content 3"
    }
];

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("remove campgrounds!");
        //add a few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This is great, but I wish there was internet",
                            author: "Homer"
                        }, function (err, comment) {
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment")
                            }
                        }
                    );
                }
            });
        });
    });
}

module.exports = seedDB;

