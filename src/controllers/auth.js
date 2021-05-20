const passport = require("passport");
const db = require("../database");
const bcrypt = require("bcrypt");

const loginUser = async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/animals",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

const registerUser = async (req, res) => {
  try {
    var errors = [];
    if (!req.body.username) {
      errors.push("username required");
    }
    if (!req.body.password) {
      errors.push("Password not specified, Password must be 8 ");
    }
    if (req.body.password !== req.body.confirm_password) {
      errors.push("Password Don't match");
    }
    if (!req.body.email) {
      errors.push("Email is Required");
    }
    if (errors.length) {
      req.flash("error_msg", errors.join(","));
      return res.status(400).redirect("/register");
    }
    console.log("here");
    const password = req.body.password;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        var sql = "INSERT INTO users ( username,email,password) VALUES (?,?,?)";
        var params = [req.body.username, req.body.email, hash];
        db.run(sql, params, function (err, result) {
          if (err) {
            return req.flash("error_msg", err.message);
          }
          console.log(result);
          return res.redirect("/login");
        });
      });
    });
  } catch (err) {
    return req.flash("error_msg", err.message);
  }
};

module.exports = {
  loginUser,
  registerUser,
};
