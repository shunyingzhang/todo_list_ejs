const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Buy Food", "Cook food"];
var newItemsList = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, res) {

    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);


    res.render("list", { kindOfDay: day, newListItems: items });

});

app.get("/work", function (req, res) {

    res.render("list", { kindOfDay: "Work List", newListItems: newItemsList });

});

app.post("/", function (req, res) {
    var item = req.body.newItem;

    if (req.body.list === "Work") {
        newItemsList.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000");
});