var express = require("express");
var router = express.Router();
var appController = require("./main.controller");

// router.route("/chooseService").get(appController.chooseService);

router.route("/mainController").get(appController.mainController);

router
  .route("/userLocatedWithinRadius")
  .get(appController.userLocatedWithinRadius);

router.route("/nearestAmbulance").get(appController.nearestAmbulances);

router.route("/confirmUser").get(appController.notify);
router.route("/confirmAmbulance").get(appController.notify2);
router.route("/ambulanceReturn").get(appController.ambulanceReturn);

module.exports = router;
