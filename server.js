// Load env
require("dotenv").config();

const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");

const app = express();

// Initialize handlebars
app.engine("hbs", hbs.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "app/views"));

// Set public assets folder
app.use(express.static("public"));

// Parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Start app
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Listening on port", port);
});
