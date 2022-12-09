function convertWaypointstoCoordinates() {
  return { lat: immediateWaypoints[0][0], lng: immediateWaypoints[0][1] };
}

module.exports = { convertWaypointstoCoordinates };
