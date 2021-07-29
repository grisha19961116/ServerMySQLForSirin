const express = require("express");
const router = express.Router();
const validate = require("./validation");
const catsController = require("../../../controllers/projects");
const guard = require("../../../helpers/guard");

router
  .get("/", guard, catsController.getAll)
  .post("/", guard, validate.createProject, catsController.create);

router
  .get("/:id", guard, catsController.getById)
  .delete("/:id", guard, catsController.remove)
  .put("/:id", guard, validate.updateProject, catsController.update);

module.exports = router;
