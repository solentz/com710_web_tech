const db = require("../database");

const getLocation = async (req, res) => {
  try {
    var query = "select * from locations";
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
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const createLocation = async (req, res) => {
  try {
    var query = "INSERT INTO locations (location) VALUES (?)";
    var params = [req.body.place];
    db.run(query, params, function (err, result) {
      if (err) {
        req.flash("error_msg", err.message);
        return res.status(400).render("animals", {
          pageTitle: "ZooLand || ",
          pageDescription: "ZooLand",
        });
      }
      req.flash("success_msg", "Place Created Successfully");
      return res.redirect(200, "/animals");
    });
  } catch (e) {
    res.status(500).render("animals", {
      pageTitle: "ZooLand || ",
      pageDescription: "ZooLand",
    });
  }
};

exports.default = {
  createLocation,
  getLocations,
};
