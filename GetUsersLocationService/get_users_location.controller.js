// const express = require("express");
// const app = express();

// //Routes
// app.get("/getUsersLocation/", (req, res) => {
//   const result = getUsersLocation();
//   console.log(result);
//   res.status(200).send(result);
// });

// let port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running at port ${port}`);
// });

// function getUsersLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const pos = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };
//         console.log(pos);
//       },
//       () => {
//         handleLocationError(true, infoWindow, map.getCenter());
//       }
//     );
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }
// }

// // module.exports = { getUsersLocation };
