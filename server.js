const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

// Require all models
const db = require("./models");
const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");


// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper"
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
