require("dotenv").config();
const path = require("path");
const sanitizeHTML = require("sanitize-html");

// Express server
const express = require("express");
const app = express();

// Enable the server to retreive and use the files in the public folder
app.use(express.static(path.resolve(__dirname, "public")));
// Enable server to read json objects from the HTML body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --------------------------------------------------
// Mongoose requirement and set up MongoDB
const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_KEY}@learning-cluster.ndbm9hw.mongodb.net`;
const dbName = "/keeper";
const mongoose = require("mongoose");
mongoose.connect(uri + dbName);

const keeperSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Notes = mongoose.model("Note", keeperSchema);
// --------------------------------------------------

// Get initial results from Notes database
app.get("/initial", async (req, res) => {
  const allNotes = await Notes.find({});
  res.json(allNotes);
});

// Update MongoDB with the new note
app.post("/create-note", ourCleanup, async (req, res) => {
  const newNote = new Notes({
    title: req.cleanData.title,
    content: req.cleanData.content,
  });

  await newNote.save().then((addedNote) => {
    res.send(addedNote);
  });
});

// Find MongoDB object by ID and delete
app.delete("/note/:id", async (req, res) => {
  const id = req.params.id;

  if (typeof id != "string") {
    id = "";
  }

  Notes.findByIdAndDelete(id, function (err) {
    console.log(err);
  });
  res.send("Deleted!");
});

// Default route
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// Clean up note data
function ourCleanup(req, res, next) {
  if (typeof req.body.title != "string") req.body.title = "";
  if (typeof req.body.content != "string") req.body.content = "";
  if (typeof req.body._id != "string") req.body._id = "";

  req.cleanData = {
    title: sanitizeHTML(req.body.title.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    }),
    content: sanitizeHTML(req.body.content.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    }),
  };

  next();
}

// Start development server on port 8080
app.listen(process.env.PORT || 8080, (req, res) => {
  console.log("Server started on port 8080");
});
