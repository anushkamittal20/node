const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.post("/", (req, res) => {
  console.log(req.body);
  const checkPoint = req.body.currentLocation;
  const centerPoint = req.body.centerPoint;
  const km = req.body.radius;
  const result = userLocatedWithinRadius(checkPoint, centerPoint, km);
  console.log(result);
  res.status(200).send(result);
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

function userLocatedWithinRadius(checkPoint, centerPoint, km) {
  var ky = 40000 / 360;
  var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  console.log("entered the function");
  return Math.sqrt(dx * dx + dy * dy) <= km;
}

// module.exports = { userLocatedWithinRadius };
