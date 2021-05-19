const db = require("../database");

const createAnimal = async (req, res) => {
  try {
    var errors = [];
    if (!req.body.name) {
      errors.push("Name required");
    }
    if (!req.body.endangered) {
      errors.push("Specify if animals is Endangered");
    }
    if (!req.body.description) {
      errors.push("Description Required");
    }
    if (!req.body.location) {
      errors.push("Location not specified");
    }
    if (!req.files) {
      errors.push("Image required");
    }

    if (errors.length) {
      req.flash("error_msg", errors.join(","));
    }

    var file = req.files.upload;
    var img_name = file.name;
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif"
    ) {
      file.mv(`src/public/images/uploads/${file.name} `, (err) => {
        if (err) {
          return req.flash("error_msg", err.message);
        }
        var query =
          "INSERT INTO animals (name,description ,endangered,location_id, image) VALUES (?,?,?,?,?)";
        var params = [
          req.body.name,
          req.body.description,
          req.body.endangered,
          req.body.location,
          img_name,
        ];
        db.run(query, params, (err, result) => {
          if (err) {
            return req.flash("error_msg", err.message);
          }
          req.flash("success_msg", "created successfully");
          return res.redirect("/animals", 200);
        });
      });
    } else {
      message =
        "This format is not allowed , please upload file with '.png','.gif','.jpg'";
      return req.flash("error_msg", message);
    }
  } catch (err) {
    req.flash("error_msg", e.message);
    return res.redirect("/animals", 200);
  }
};

const getAnimals = async (req, res) => {
  try {
    var query = "SELECT * FROM animals";
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

const getAnimalById = async (req, res) => {
  try {
    var query =
      "SELECT animal.id,location.location, animal.endangered,animal.description,animal.location_id,animal.image,animal.name FROM animals AS animal inner join locations AS location ON animal.location_id = location.id where animal.id = ?";
    var params = [req.params.id];
    db.get(query, params, (err, row) => {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
        return;
      }
      res.status(200).json({
        data: row,
      });
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const deleteAnimalById = async (req, res) => {
  try {
    db.run("DELETE FROM animals WHERE id = ?", [req.params.id], function (
      err,
      result
    ) {
      if (err) {
        return req.flash("error_msg", err.message);
      }
      req.flash("success_msg", " Animal has been deleted Successfully");
      return res.status(200).json({ message: "successful", data: result });
    });
  } catch (e) {
    return req.flash("error_msg", e.message);
  }
};

const updateAnimalById = async (req, res) => {
  try {
    db.run(
      `UPDATE animals SET name = coalesce(?,name), description = coalesce(?,description), 
        endangered = coalesce(?,endangered), location_id = coalesce(?,location) WHERE id = ?`,
      [
        req.body.name,
        req.body.description,
        req.body.endangered,
        req.body.location,
        req.params.id,
      ],
      function (err, result) {
        if (err) {
          return req.flash("error_msg", err.message);
        }
        req.flash("success_msg", "Updated Successfully");
        return res.redirect("/animals", 200);
      }
    );
  } catch (e) {
    req.flash("error_msg", e.message);
    res.redirect("update-animal");
  }
};


module.exports = {
  createAnimal,
  getAnimals,
  getAnimalById,
  deleteAnimalById,
  updateAnimalById,
};
