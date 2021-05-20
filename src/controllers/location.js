const db = require("../database");

const getLocations = async (req, res) => {
  try {
    var query = "SELECT * FROM locations";
    var params = [];
    db.all(query, params, (err, rows) => {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }
      res.status(200).json({
        data: rows,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const createLocation = async (req, res) => {
  try {
    if (!req.body.location) {
      req.flash("error_msg", "Location Require");
      return;
    }
    var query = "INSERT INTO locations (location) VALUES (?)";
    var params = [req.body.location];
    db.run(query, params, function (err, result) {
      if (err) {
        req.flash("error_msg", err.message);
        return res.status(400).render("animals", {
          pageTitle: "ZooLand || ",
          pageDescription: "ZooLand",
        });
      }
      req.flash("success_msg", "Place Created Successfully");
      return res.redirect("/animals");
    });
  } catch (err) {
    req.flash("error_msg", err.message);
    res.status(500).render("animals", {
      pageTitle: "ZooLand || ",
      pageDescription: "ZooLand",
    });
  }
};

module.exports = {
  createLocation,
  getLocations,
};
