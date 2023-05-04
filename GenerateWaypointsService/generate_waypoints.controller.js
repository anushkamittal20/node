const express = require("express");
const app = express();
let initialWaypoints = [];
app.use(express.json());

//Routes
app.post("/", (req, res) => {
  initialWaypoints = req.body.initialWaypoints;
  console.log(initialWaypoints);
  const result = generateWaypoints(initialWaypoints);
  console.log(result);
  res.status(200).send(result);
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

function generateWaypoints(decodedWaypoints) {
  var count = 0;

  //filtering through decodedPolyline to set waypoints at a distance of 500 meters

  waypoints = decodedWaypoints.filter((element, index) => {
    if (count == 0) {
      count = index;
      return true;
    } else {
      var dis = distance(
        decodedWaypoints[count][0],
        decodedWaypoints[index][0],
        decodedWaypoints[count][1],
        decodedWaypoints[index][1]
      );
      console.log(dis);
      if (dis >= 0.5) {
        count = index;
        return true;
      }
    }
    return false;
  });
  console.log("in generated waypoints: ", waypoints.length);
  return waypoints;
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

// uses the decoded polyline and op is also an array of co ordinates

// module.exports = { generateWaypoints };
