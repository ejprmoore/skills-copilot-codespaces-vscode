// Create web server
// Create a new Express web server
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var fs = require("fs");

// Add a new route to the Express web server
app.get("/", function(req, res) {
  // Send a response to the client
  res.send("Hello, world!");
});

// Add a new route to the Express web server
app.get("/comments", function(req, res) {
  // Read the comments from the file
  fs.readFile("comments.json", function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    // Send the comments to the client
    res.send(data.toString());
  });
});

// Add a new route to the Express web server
app.post("/comments", bodyParser.json(), function(req, res) {
  // Read the comments from the file
  fs.readFile("comments.json", function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    // Parse the comments
    var comments = JSON.parse(data);

    // Add the new comment to the comments
    comments.push(req.body);

    // Write the comments to the file
    fs.writeFile("comments.json", JSON.stringify(comments, null, 2), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      // Send a response to the client
      res.send("Comment added!");
    });
  });
});

// Add a new route to the Express web server
app.use(express.static(path.join(__dirname, "public")));

// Start the Express web server
app.listen(3000, function() {
  console.log("Server started on http://localhost:3000");
});