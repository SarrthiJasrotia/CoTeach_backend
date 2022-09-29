///////////////////////////////
// DEPENDENCIES
////////////////////////////////

// get .env variables
require("dotenv").config();

// pull PORT and MONGODB_URL from .env
const { PORT = 4000 || 4000, MONGODB_URL } = process.env;

// import express
const express = require("express");

//create application object
const app = express();

// import mongoose
const mongoose = require("mongoose");

// import middleware
const cors = require('cors');
const morgan = require('morgan');

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
const PeopleSchema = new mongoose.Schema({
  name: String,
});

const People = mongoose.model("People", PeopleSchema);


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


///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => {
  console.log(`listening on PORT... ${PORT}`);
});
