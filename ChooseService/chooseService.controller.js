const express = require("express");
const app = express();
let serviceName = "";

//Routes
app.get("/chooseService/:serviceName", (req, res) => {
  serviceName = req.params.serviceName;
  res.send("Welcome to choose service!");
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

var chosenService;
function chooseService(obj, serviceName) {
  console.log(`Chosen service is ${serviceName}`);
  chosenService = serviceName;
}

function confirmService() {
  if (chosenService == null) {
    console.log("Please choose a service before proceeding");
  } else {
    console.log(`You have confirmed the ${chosenService}`);
  }
}

function showPosition(position) {
  console.log(
    "Your location is Latitude: " +
      position.coords.latitude +
      "\tLongitude: " +
      position.coords.longitude
  );
}

function goTo(s) {
  console.log("You want to go to this place: ", s);
}

module.exports = {
  chooseService,
  confirmService,
  showPosition,
  goTo,
};
