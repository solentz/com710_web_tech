const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const ejsTemplate = require("ejs");
const PORT = process.env.port || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "html");
app.engine("html", ejsTemplate.renderFile);
app.set("views", __dirname + "/views");

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session && passport configuration

app.use(
  session({
    secret: "secretKey",
    resave: true,
    saveUninitialized: true,
  })
);
require("./middleware/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// Express message middleware
app.use(flash()); //connect flash

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error = req.flash("error");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

//checks weather user is logged in or not
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// animal route
const animalRoute = require("./routes/animal");
app.use("/api", animalRoute);

// location route
// const locationRoute = require("./routes/location");
// app.use("/api", locationRoute);

// // auth route
const authRoute = require("./routes/auth");
app.use("/api/auth", authRoute);

// Get request for index page
app.get("/", (request, response) => {
  response.render("index", {
    pageTitle: "ZooLand || Home Page",
    pageDescription: "ZooLand is  a website for children",
  });
});

/**
 * Authentication Routes
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
app.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "Successfully logged out");
  res.redirect("/");
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

app.get("/games/endangered", (request, response) => {
  response.render("games/endangered", {
    pageTitle: "ZooLand || Endangered Page",
    pageDescription: "Zooland",
  });
});
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
