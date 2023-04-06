var express = require("express");
var router = express.Router();
var chooseServiceController = require("./chooseService.controller");

router
  .route("/chooseService/:serviceName")
  .get(chooseServiceController.chooseService);
