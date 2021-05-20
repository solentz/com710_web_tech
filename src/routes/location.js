const router = require("express").Router();
const { notAuthenticated, authenticatedUser } = require("../middleware");
const { createLocation, getLocations } = require("../controllers/location");

// location route
router.get("/location", notAuthenticated, getLocations);
router.post("/location", authenticatedUser, createLocation);

module.exports = router;
