var express = require("express");
var router = express.Router();
var appController = require("../controller/main.controller");

router.route("/chooseService").get(appController.chooseService);

router.route("/mainController").get(appController.mainController);

router
  .route("/userLocatedWithinRadius")
  .get(appController.userLocatedWithinRadius);

router.route("/nearestAmbulance").get(appController.nearestAmbulances);

router.route("/confirmUser").get(appController.notify);
router.route("/confirmAmbulance").get(appController.notify2);
router.route("/ambulanceReturn").get(appController.ambulanceReturn);

// router.route("/decodeWaypoints").get(appController.decodeWaypoints);

// router
//   .route("/dynamicRadiusGenerator")
//   .get(appController.dynamicRadiusGenerator);

// router.route("/generateWaypoints").get(appController.generateWaypoints);

// router.route("/getUserLocation").get(appController.getUserLocation);

// router
//   .route("/waypointsToCoordinates")
//   .get(appController.waypointsToCoordinates);

module.exports = router;
