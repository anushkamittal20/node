const express = require("express");
const router = express.Router();
var appController = require("./main.controller");

router.get("/", (req, res) => {
  res.send("we are in alarms router");
});

router.route("/mainController").get(appController.mainController);

router
  .route("/userLocatedWithinRadius/")
  .post(appController.userLocatedWithinRadius);

router.route("/nearestAmbulance").get(appController.nearestAmbulances);

router.route("/confirmUser").get(appController.notify);
router.route("/confirmAmbulance").get(appController.notify2);
router.route("/ambulanceReturn").get(appController.ambulanceReturn);

module.exports = router;
