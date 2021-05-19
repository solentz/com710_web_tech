const authenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // if not authenticated
  req.flash("error_msg", "Please login to view this resource");
  res.redirect("/login");
};

// ensure no user logged in if they want to access the route
const notAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/animals");
  }
  next();
};

module.exports = {
  authenticatedUser,
  notAuthenticated,
};
