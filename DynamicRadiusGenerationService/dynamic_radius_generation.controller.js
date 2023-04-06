const express = require("express");
const app = express();
let waypoints = "";
app.use(express.json());

//Routes
app.post("/dynamicRadiusGeneration/", (req, res) => {
  waypoints = req.body;
  console.log(waypoints);
  const result = findMinDistance(waypoints);
  console.log(result);
  res.status(200).send(result.toString());
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

function findMinDistance(waypoints) {
  // Initialize difference as infinite
  var diff = 99999999,
    p,
    k;
  // Find the min diff by comparing difference
  // of all possible pairs in given array
  for (var i = 0; i < waypoints.length; i++) {
    for (var j = i + 1; j < waypoints.length; j++) {
      var dis = distance(
        waypoints[i][0],
        waypoints[j][0],
        waypoints[i][1],
        waypoints[j][1]
      );
      if (dis < diff && dis != 0) {
        diff = dis;
        p = i;
        k = j;
      }
    }
  }

  return diff;
}

function distance(lat1, lat2, lon1, lon2) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;

  // calculate the result
  return c * r;
}

// module.exports = { findMinDistance, distance };
