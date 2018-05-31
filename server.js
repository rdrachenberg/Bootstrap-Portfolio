const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const api_routes = require("./routes");
const port = process.env.PORT || 8080;
const config = require("./config");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const db = require("./models");
const databaseURI = ("mongodb://localhost/rd-portfolio-db");
const mongodb = require('mongodb');
const app = express();
const logger = require("morgan");
let uri = `mongodb://heroku_brj5m93v:ad0meuap52vi25hnia7qju81ds@ds139970.mlab.com:39970/heroku_brj5m93v`
let db2 = mongoose.connection; 
let cors = require('cors');

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || databaseURI);
mongoose.connect(`mongodb://heroku_brj5m93v:ad0meuap52vi25hnia7qju81ds@ds139970.mlab.com:39970/heroku_brj5m93v`);

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect(databaseURI);
}
// Set up error log for mongoose error
db2.on('error', function (err) {
    console.log("MONGOOSE ERROR: ", err);
});
// Set up successful Mongoose Connnection log
db2.once('open', function () {
    console.log("Mongoose Connection Successful. ");
});
// Set up logger
app.use(logger('dev'));

// set up Express 
app.use(express.static(path.join(__dirname, "client/build")));

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({extended: false}));

// Use express.static to serve the public folder as a static directory
app.use(express.static('public'));

//Set up Body Parser
app.use(bodyParser.json());


// Set up CORS
app.use(cors()) //
app.use("/", api_routes);
app.use(function (req, res, next) { res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// seed db
db.User.create({
    name: "Tester McFly",
    email: "tester@gmail.com",
    phone: "555-555-5555",
    message: "This is a tester message"
})
.then(function (dbUser) {
    console.log(dbUser);
})
.catch(function (err) {
    console.log(err.message);
});
// Handle the post for this route
app.post("/api/user", function (req, res, next) {
    db.User.create(req.body)

    .then(function (dbUser) {
    // If the User was updated successfully, send it back to the client
        res.json(dbUser);
    })
    .catch(function (err) {
    // If an error occurs, send it back to the client
        res.json(err);
    });
});
app.post("/api/message", function (req, res, next) {
    db.Message.create(req.body)
    .then(function (dbMessage) {
    // If a Message was created successfully, find one User (there's only one) and push the new Message's _id to the User's `Messages` array
    // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
    // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.User.findOneAndUpdate({}, {
            $push: {
                Messages: dbMessage._id
            }
        }, {
            new: true
            });
    })
    .then(function (dbUser) {
    // If the User was updated successfully, send it back to the client
        res.json(dbUser);
    })
    .catch(function (err) {
    // If an error occurs, send it back to the client
        res.json(err);
    });
});
// Route for retrieving all Users from the db
app.get("/user", function (req, res) {
    // Find all Users
    db.User.find({})
        .then(function (dbUser) {
            // If all Users are successfully found, send them back to the client
            res.json(dbUser);
        })
        .catch(function (err) {
            // If an error occurs, send the error back to the client
            res.json(err);
        });
});
// Route for retrieving all Notes from the db
app.get("/message", function (req, res) {
    // Find all Notes
    db.Message.find({})
        .then(function (dbMessage) {
            // If all Notes are successfully found, send them back to the client
            res.json(dbMessage);
        })
        .catch(function (err) {
            // If an error occurs, send the error back to the client
            res.json(err);
        });
});

app.get("*", (req, res, next) => {
// res.sendFile(path.join(__dirname, "client/build/index.html"));
// res.sendFile(path.join(__dirname, "./index.html"));
});

app.use(
    session({
        secret: "crazy",
        resave: false,
        saveUninitialized: false
    })
);

    app.use(passport.initialize());
    app.use(passport.session());

    // Start the API server
    app.listen(port, function () {
        console.log(`🌎  ==> API Server now listening on port ${port}!`);
    });