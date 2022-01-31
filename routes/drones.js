const express = require("express");
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model.js");

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then((allTheDronesFromDB) => {
      //console.log("Retrieved drones from DB:", allTheDronesFromDB);

      res.render("drones/list.hbs", { drones: allTheDronesFromDB });
    })
    .catch((error) => {
      console.log("Error while getting the drones from the DB: ", error);

      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
    res.render("drones/create-form.hbs")
});

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  // console.log(req.body);
  const { name, propellers, maxSpeed } = req.body;
  
  Drone.create({ name, propellers, maxSpeed })
  // .then(droneFromDB => console.log(`New drone created: ${droneFromDB.name}.`))
  .then(() => res.redirect("/drones"))
  .catch((error) => next(error));
});

router.get("/drones/:droneId/edit", (req, res, next) => {
  // Iteration #4: Update the drone
const { droneId } = req.params;

Drone.findById(droneId)
  .then((droneToEdit) => {
    console.log(droneToEdit);
    res.render("drones/update-form.hbs", { drone: droneToEdit });
  })
  .catch((error) => next(error));

});

router.post("/drones/:droneId/edit", (req, res, next) => {
  // Iteration #4: Update the drone
   const { droneId } = req.params;
   const { name, propellers, maxSpeed } = req.body;

   Drone.findByIdAndUpdate(droneId, { name, propellers, maxSpeed },
     { new: true })
     .then((updatedDrone) => res.redirect("/drones"))
     // .id gives us the id as a string. "_id" (adding the underscore) is the id objects
     // go to the details page to see the updates
     .catch((error) => next(error));
});

router.post("/drones/:droneId/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  
  const { droneId } = req.params;

    Drone.findByIdAndDelete(droneId)
      .then(() => res.redirect("/drones"))
      .catch((error) => next(error));
});

module.exports = router;
