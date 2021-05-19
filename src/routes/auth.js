const router = require("express").Router();
const { notAuthenticated } = require("../middleware");
const { loginUser, registerUser } = require("../controllers/auth");

// user authentication route
router.post("/login", notAuthenticated, loginUser);
router.post("/register", notAuthenticated, registerUser);

module.exports = router;
