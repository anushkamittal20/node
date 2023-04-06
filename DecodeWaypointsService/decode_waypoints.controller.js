const express = require("express");
const app = express();
let polyline = "";
let precision = "";

//Routes
app.get("/decodeWaypoints/:polyline/:precision", (req, res) => {
  polyline = req.params.polyline;
  precision = req.params.precision;
  const result = decodePath(polyline, precision);
  console.log(result);
  res.status(200).send(result);
  res.send("Welcome to decode waypoints service!");
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

function decodePath(polyline, precision) {
  var index = 0,
    lat = 0,
    lng = 0,
    coordinates = [],
    shift = 0,
    result = 0,
    byte = null,
    latitude_change,
    longitude_change,
    factor = Math.pow(10, Number.isInteger(precision) ? precision : 5);

  while (index < polyline.length) {
    // Reset shift, result, and byte
    byte = null;
    shift = 0;
    result = 0;

    do {
      byte = polyline.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    latitude_change = result & 1 ? ~(result >> 1) : result >> 1;

    shift = result = 0;

    do {
      byte = polyline.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    longitude_change = result & 1 ? ~(result >> 1) : result >> 1;

    lat += latitude_change;
    lng += longitude_change;

    coordinates.push([lat / factor, lng / factor]);
  }
  // console.log("these are the decoded waypoints: ", coordinates);
  console.log("in decoded waypoints: ", coordinates.length);
  return coordinates;
  // coordinates = decode(polyline, 5);
}
// takes in a polyline ob (flutter) as ip and output is the decoded polyline (array)

// module.exports = { decodePath };
