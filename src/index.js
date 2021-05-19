const express = require("express");
const app = express();
const path = require("path");
const ejsTemplate = require("ejs");
const PORT = process.env.port || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "html");
app.engine("html", ejsTemplate.renderFile);
app.set("views", __dirname + "/views");

app.get("/", (request, response) => {
  response.render("index", {
    pageTitle: "ZooLand || Home Page",
    pageDescription: "ZooLand is  a website for children",
  });
});

/**
 * Authenticated Routes
 */
app.get("/login", (request, response) => {
  response.render("auth/login", {
    pageTitle: "ZooLand || Login Page",
    pageDescription: "ZooLand is  a website for children",
  });
});

app.get("/register", (request, response) => {
  response.render("auth/signup", {
    pageTitle: "Zooland || Login Page",
    pageDescription: "ZooLand is a website for children",
  });
});

/**
 *
 */
app.get("/animals", (request, response) => {
  response.render("animals", {
    pageTitle: "ZooLand || Animals Page",
    pageDescription: "ZooLand is  a website for children",
  });
});

app.get("/games", (request, response) => {
  response.render("games/game", {
    pageTitle: "ZooLand || Game Page",
    pageDescription: "Zooland",
  });
});

app.get("/games/endangered",(request,response)=>{
  response.render("games/endangered",{
    pageTitle:"ZooLand || Endangered Page",
    pageDescription:"Zooland"
  })
})
app.get("*", (request, response) => {
  response.render("404", {
    pageTitle: "404 Error",
    pageDescription: "404 Page not found",
  });
});
// Listening
app.listen(PORT, (request, response) => {
  console.log(`application is running on port http://localhost:${PORT}`);
});
