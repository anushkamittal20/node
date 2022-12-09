function immediateWaypoints(waypoints) {
  return [
    convertWaypointstoCoordinates(waypoints[0]),
    convertWaypointstoCoordinates(waypoints[1]),
  ];
}

function convertWaypointstoCoordinates(array) {
  return { lat: array[0], lng: array[1] };
}

module.exports = { immediateWaypoints };
