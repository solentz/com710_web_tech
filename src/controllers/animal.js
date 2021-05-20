const db = require("../database");

const createAnimal = async (req, res) => {
  try {
    var errors = [];
    console.log(req.body);
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
      return res.status(400).redirect("/create");
    }

    var file = req.files.upload;

    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif"
    ) {
      var img_name = file.name;
      file.mv(`src/public/img/uploads/` + file.name, (err) => {
        if (err) {
          req.flash("error_msg", err.message);
          return res.status(400).redirect("/create");
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
            req.flash("error_msg", err.message);
            return res.status(400).redirect("/create");
          }
          req.flash("success_msg", "created successfully");
          return res.status(200).redirect("/animals");
        });
      });
    } else {
      message =
        "This format is not allowed , please upload file with '.png','.gif','.jpg'";
      req.flash("error_msg", message);
      return res.status(400).redirect("/create");
    }
  } catch (err) {
    req.flash("error_msg", err.message);
    return res.status(500).redirect("/create");
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
  } catch (err) {
    return res.status(500).json({
      err: err.message,
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
      return res.status(200).json({
        data: row,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
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
        req.flash("error_msg", err.message);
        return res.status(400).json({ error: err.message });
      }
      req.flash("success_msg", " Animal has been deleted Successfully");
      return res.status(200).json({ message: "successful", data: result });
    });
  } catch (err) {
    req.flash("error_msg", err.message);
    return res.status(500).json({ error: err.message });
  }
};

const updateAnimalById = async (req, res) => {
  try {
    db.run(
      `UPDATE animals SET name = coalesce(?,name), description = coalesce(?,description), 
        endangered = coalesce(?,endangered), location_id = coalesce(?,location_id) WHERE id = ?`,
      [
        req.body.name,
        req.body.description,
        req.body.endangered,
        req.body.location,
        req.params.id,
      ],
      function (err, result) {
        if (err) {
          console.log(err.message);
          req.flash("error_msg", err.message);
          return res.status(400).redirect(`/edit/${req.params.id}`);
        }
        req.flash("success_msg", "Updated Successfully");
        return res.status(200).redirect("/animals");
      }
    );
  } catch (err) {
    req.flash("error_msg", err.message);
    res.status(500).redirect(`/edit/${req.params.id}`);
  }
};

module.exports = {
  createAnimal,
  getAnimals,
  getAnimalById,
  deleteAnimalById,
  updateAnimalById,
};
