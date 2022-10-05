
///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 4000
// pull MONGODB_URL from .env
const { PORT = 4000, MONGODB_URL } = process.env;

// import express
const express = require("express");

// create application object
const app = express();

// import mongoose
const mongoose = require("mongoose");

// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
// Connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const ContentSchema = new mongoose.Schema({
    title: String,
    teacher: String,
    videoURL: String,
    guidingQuestions: String,
    backgroundKnowledge: String,
    activities: String,
    lessonPlan: String,
    resources: String,
    category: String,
})
const Content = mongoose.model("Content", ContentSchema);

const NotesSchema = new mongoose.Schema({
    notes: String,
})

const Notes = mongoose.model("Notes", NotesSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("hello world");
});

// Content INDEX ROUTE
app.get("/content", async (req, res) => {
    try {
        // send all content
        res.json(await Content.find({}));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// Content DELETE ROUTE
app.delete("/content/:id", async (req, res) => {
    try {
        // send all content
        res.json(await Content.findByIdAndRemove(req.params.id));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

//  Content UPDATE ROUTE
app.put("/content/:id/", async (req, res) => {
    try {
        // send all content
        res.json(
            await Content.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// Content CREATE ROUTE
app.post("/content", async (req, res) => {
    try {
        // send all  content
        res.json(await Content.create(req.body));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// Notes Create Route
app.post("/notes" , async (req, res) => {
    try {
        // send notes to database
        res.json(await Notes.create(req.body));
    } catch (error) {
        // send error msg
        res.status(400).json(error);
    }
})


///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));