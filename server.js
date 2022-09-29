///////////////////////////////
// DEPENDENCIES
////////////////////////////////

// get .env variables
require("dotenv").config();

// pull PORT and MONGODB_URL from .env
const { PORT, MONGODB_URL } = process.env;

// import express
const express = require("express");

//create application object
const app = express();

// import mongoose
const mongoose = require("mongoose");

// import middleware
const cors = require('cors');
const morgan = require('morgan');
const Content = require("./models/content");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////

// Establish Connection
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////

require("./models/content");

///////////////////////////////
// MIDDLEWARE
////////////////////////////////

//prevent cors errors, open access to all origins
app.use(cors());

//logging of http requests
app.use(morgan("dev"));

// parse json bodies
app.use(express.json());

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("test route");
});

// Content Index

app.get("/content" , async (req, res) => {
    try {
        // send all content
        res.json(await Content.find({}))
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
})

// New Route

// Delete Route

app.delete("content/:id" , async (req, res) => {
    try {
        // send all contend
        res.json(await Content.findByIdAndRemove(req.params.id))
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
})


// Update Route

// Create Route

app.post("/content" , async(req, res) => {
    try {
        res.json(await Content.create(req.body));
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
})

// Edit Route

// Show Route


///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => {
  console.log(`listening on PORT... ${PORT}`);
});
