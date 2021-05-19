const router = require("express").Router();
const {
  createAnimal,
  getAnimals,
  getAnimalById,
  deleteAnimalById,
  updateAnimalById,
} = require("../controllers/animal");
const { authenticatedUser, notAuthenticated } = require("../middleware");

router.get("/animals", getAnimals);
router.post("/animals", authenticatedUser, createAnimal);

//
router.get("/animals/:id", getAnimalById);
router.put("/animals/:id", authenticatedUser, updateAnimalById);
router.delete("/animals/:id", authenticatedUser, deleteAnimalById);

module.exports = router;
