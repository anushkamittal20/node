module.exports.chooseService = function (req, res) {
  /*
    Request has to be of the form:
    {
    "serviceName": "ambulance", 
    "position": {
        "coords" : {
            "latitude" : 13.0147,
            "longitude": 77.581
        }
    },
    "to" : "THIS_PLACE"
    }
    */
  console.log("chooseService is called ");

  // getting values from postman/client
  let GETchosenService = req.body.serviceName;
  let GETPosition = req.body.position;
  let GETTo = req.body.to;

  // creating a chooseService object
  const choose_service = require("./chooseService.controller");
  // calling functions
  choose_service.chooseService("", GETchosenService);
  choose_service.confirmService();
  // choose_service.getLocation();
  choose_service.showPosition(GETPosition);
  choose_service.goTo(GETTo);

  // returning whatever we've received so far
  let returnData = {};
  returnData.message = "chooseService is called";
  returnData.selectedService = GETchosenService;
  returnData.position = GETPosition;
  returnData.to = GETTo;

  res.status(200).json(returnData);
};

// module.exports.decodeWaypoints = function (req, res) {
//   /*
//   request has to be of the form:
//   {
//   "str" : "SOME_STRING",
//   "precision": 5
//   }
//   */
//   console.log("decodeWaypoints is called ");

//   // getting values from postman/client
//   let GETPolyline = req.body.polyline;

//   // creating a decodeWaypoints object
//   const decode_waypoints = require("./decode_waypoints.controller");
//   // calling functions
//   let decodedWaypoints = decode_waypoints.decodePath(GETPolyline);

//   // returning whatever we've received so far
//   let returnData = {};
//   returnData.message = "decodeWaypoints is called";
//   returnData.decodedWaypoints = decodedWaypoints;

//   res.status(200).json(returnData);
// };

// module.exports.dynamicRadiusGenerator = function (req, res) {
//   console.log("dynamicRadiusGenerator is called ");

//   let GETWaypoints = req.body.waypoints;
//   // let GETLat1 = req.body.lat1;
//   // let GETLat2 = req.body.lat2;
//   // let GETLong1 = req.body.long1;
//   // let GETLong2 = req.body.long2;

//   const dynamic_radius_generation = require("./dynamic_radius_generation.controller");
//   let minDistance = dynamic_radius_generation.findMinDistance(GETWaypoints);
//   // let distance = dynamic_radius_generation.distance(
//   //   GETLat1,
//   //   GETLat2,
//   //   GETLong1,
//   //   GETLong2
//   // );

//   let returnData = {};
//   returnData.message = "dynamicRadiusGenerator is called";
//   returnData.minDistance = minDistance;
//   returnData.distance = distance;

//   res.status(200).json(returnData);
// };
/*
  module.exports.generateWaypoints = function (req, res) {
    console.log("generateWaypoints is called ");
  
    let GETPolyline = req.body.polyline;
    let GETPrecision = req.body.precision;
  
    const decode_waypoints = require("./decode_waypoints.controller");
    let decodedPolyline = decode_waypoints.decodePath(GETPolyline, GETPrecision);
  
    const generate_waypoints = require("./generate_waypoints.controller");
  
    let generatedWaypoints =
      generate_waypoints.generateWaypoints(decodedPolyline);
  
    console.log("these are the decoded waypoints: ", decodedPolyline);
    console.log("these are the generated waypoints: ", generatedWaypoints);
  
    let returnData = {};
    returnData.message = "generateWaypoints is called";
    returnData.generatedWaypoints = generatedWaypoints;
    returnData.decodedWaypoints = decodedPolyline;
  
    res.status(200).json(returnData);
  };
  */
module.exports.userLocatedWithinRadius = function (req, res) {
  let GETCurrentLocation = req.body.currentLocation;
  let GETImmediateWaypoints = req.body.iwaypoints;
  let GETRadius = req.body.radius;
  let GETMAXRadius = req.body.maxRadius;

  const user_located_within_radius = require("./user_located_within_radius.controller");

  let result = user_located_within_radius.userLocatedWithinRadius(
    GETCurrentLocation,
    GETImmediateWaypoints,
    GETRadius
  );

  let result2 = user_located_within_radius.userLocatedWithinRadius(
    GETCurrentLocation,
    GETImmediateWaypoints,
    GETMAXRadius
  );

  let returnData = {};
  returnData.message = "userLocatedWithinRadius is called";
  returnData.green = result;
  returnData.yellow = result2;

  res.status(200).json(returnData);
};

// module.exports.waypointsToCoordinates = function (req, res) {
//   console.log("waypointsToCoordinates is called ");

//   const waypoints_to_coordinates = require("./waypoints_to_coordinates.controller");
//   // waypoints_to_coordinates.convertWaypointstoCoordinates()s

//   let returnData = {};
//   returnData.status = "200";
//   returnData.message = "waypointsToCoordinates is called";
//   returnData.error = "NA";

//   res.status(200).json(returnData);
// };

module.exports.mainController = function (req, res) {
  let GETPolyline = req.body.polyline;

  const decode_waypoints = require("./decode_waypoints.controller");
  const dynamic_radius_generation = require("./dynamic_radius_generation.controller");
  const generate_waypoints = require("./generate_waypoints.controller");
  const immediate_waypoints = require("./immediateWaypoints.controller");

  let decodedPolyline = decode_waypoints.decodePath(GETPolyline);
  let generatedWaypoints =
    generate_waypoints.generateWaypoints(decodedPolyline);
  let minRadius = dynamic_radius_generation.findMinDistance(generatedWaypoints);
  let immediateWaypoint2 =
    immediate_waypoints.immediateWaypoints(generatedWaypoints);

  let maxRadius = minRadius / 2 + minRadius;

  // console.log("generateWaypoints is called ");
  // console.log("these are the decoded waypoints: ", decodedPolyline);
  // console.log("these are the generated waypoints: ", generatedWaypoints);
  // console.log("dynamicRadiusGenerator is called ");
  // console.log("immediateWaypoints is called");

  let returnData = {};
  returnData.dynamic_radius = minRadius;
  returnData.immediate_waypoints = immediateWaypoint2;
  returnData.max_radius = maxRadius;

  res.status(200).json(returnData);
};

module.exports.nearestAmbulances = function (req, res) {
  const nearest_ambulances = require("./nearest_ambulance.controller");
  // const dispatch_to_all_ambulances = require("./dispatch_to_all.controller");

  let GETUserLng = req.body.Lng;
  let GETUserLat = req.body.Lat;

  // let ambulances = [];
  let returnData = [];
  returnData.ambulances = {};

  let resultSet = nearest_ambulances.calculateNearestAmbulances(
    GETUserLng,
    GETUserLat
  );

  console.log(
    "In Main.Controller: ResultSet = ",
    resultSet.then((value) => (returnData.ambulances += value))
  );

  res.status(200).json(returnData);
};
var userConfirmation = false;
var GETCurrentLocation;
module.exports.notify = function (req, res) {
   GETCurrentLocation = req.body.currentLocation;
  userConfirmation = true;
  let returnData = {};
  returnData.message = "userLocatedWithinRadius is called123";
  returnData.userConfirmation=userConfirmation;
  res.send(userConfirmation)

  //res.status(200).json(returnData);
};
  /*let GETUserLng = req.body.Lat;
  let GETUserLat = req.body.Lng;*/
  
      // userConfirmation = true;
      //res.send(userConfirmation);
      //res.send(GETUserLat);
      //let returnData = {};
  //returnData.L = GETUserLat;


//  res.status(200);

// };
module.exports.notify2 = function (req, res){

  let returnData = {};
  returnData.message = "notify2 for ambulance is called123";
  returnData.userConfirmation=userConfirmation;
  if(!userConfirmation) {
    returnData.currentLocation = {"lat":0.0,"lng":0.0};
  }else{
  returnData.currentLocation = GETCurrentLocation;
  }userConfirmation=false;
  
  //return user location



/*module.exports.notify2 = function (req, res){
const location=require("./get_users_location.controller");
location.getUsersLocation()*/

res.status(200).json(returnData);
}