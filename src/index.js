const express = require("express");
const app = express();
const path = require("path");
const ejsTemplate = require("ejs");
const PORT = process.env.port || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "html");
app.engine("html", ejsTemplate.renderFile);
app.set("views", __dirname + "/views");

/**
 *
 */
app.get("/", (request, response) => {
  response.render("index", {
    pageTitle: "ZooLand || Home Page",
    pageDescription: "ZooLand is  a website for children",
  });
});

app.get("/login", (request, response) => {
  response.render("auth/login", {
    pageTitle: "ZooLand || Login Page",
    pageDescription: "ZooLand is  a website for children",
  });
});
//
app.listen(PORT, (request, response) => {
  console.log(`application is running on port http://localhost:${PORT}`);
});
