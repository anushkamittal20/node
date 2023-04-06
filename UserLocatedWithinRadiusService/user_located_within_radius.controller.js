function userLocatedWithinRadius(checkPoint, centerPoint, km) {
  var ky = 40000 / 360;
  var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  console.log("entered the function");
  return Math.sqrt(dx * dx + dy * dy) <= km;
}

module.exports = { userLocatedWithinRadius };
