const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const api_routes = require("./routes");
const port = process.env.PORT || 8080;
const config = require("./config");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

    // Connect to the Mongo DB
    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rd-portfolio-db");
    // mongoose.connect(`mongodb://${config.db_user}:${config.db_pass}@ds117605.mlab.com:17605/test_db`);

    const app = express();

    app.use(express.static(path.join(__dirname, "client/build")));

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    let cors = require('cors')

    app.use(cors()) //
    app.use("/", api_routes);
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    });

    app.post("/", function (req, res, next) {
        // Handle the post for this route
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