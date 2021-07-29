const express = require("express");
const router = express.Router();
const validate = require("./validation");
const { createAccountLimiter } = require("../../../helpers/limiters");
const userController = require("../../../controllers/users");
const guard = require("../../../helpers/guard");

router.post(
  "/registration",
  createAccountLimiter,
  validate.authUser,
  userController.reg
);
router.post("/login", validate.authUser, userController.login);
router.post("/logout", guard, userController.logout);

module.exports = router;
