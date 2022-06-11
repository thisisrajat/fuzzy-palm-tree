// Load env
require("dotenv").config();

const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");

const commentRoutes = require("./app/routes/comment");
const apiRoutes = require("./app/routes/api");
const websocketRoutes = require("./app/routes/websocket_routes");

const app = express();
const expressWs = require("express-ws")(app);

// Initialize handlebars
app.engine("hbs", hbs.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "app/views"));

// Set public assets folder
app.use(express.static("public"));

// Parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route handlers
app.use("/", commentRoutes);
app.use("/", apiRoutes);

websocketRoutes(app, expressWs);

// Start app
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Listening on port", port);
});
