const express = require("express");
const app = express();
app.use(express.json());

//Routes
app.post("/immediateWaypoints/", (req, res) => {
  const waypoints = req.body.waypoints;
  console.log(waypoints);
  const result = immediateWaypoints(waypoints);
  console.log(result);
  res.status(200).send(result);
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

function immediateWaypoints(waypoints) {
  return [
    convertWaypointstoCoordinates(waypoints[0]),
    convertWaypointstoCoordinates(waypoints[1]),
  ];
}

function convertWaypointstoCoordinates(array) {
  return { lat: array[0], lng: array[1] };
}

// module.exports = { immediateWaypoints };
