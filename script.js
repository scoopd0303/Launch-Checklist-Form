// Write your JavaScript code here!

function checkFuel(fuelAmount) {
   if (fuelAmount > 10000) {
      return true;
   }
   return false;
} 

function checkCargo(cargoAmount) {
   if (cargoAmount < 10000) {
      return true;
   }
   return false;
}

function isReadyForLaunch(fuelLevel, cargoLevel) {
   if (checkFuel(fuelLevel) === true && checkCargo(cargoLevel) === true) {
      return true;
   }
   return false;
}

window.addEventListener("load", function() {

   let launchform = document.querySelector("form");

   launchform.addEventListener("submit", function(event) {

      event.preventDefault();

      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");

      if (pilotName.value === '' || copilotName.value === '' || fuelLevel.value === '' || cargoMass.value === '') {

         event.preventDefault();
         alert("All fields required!");

      } else if (isNaN(Number(fuelLevel.value)) || isNaN(Number(cargoMass.value))) {

         alert("Make sure to enter valid information for each field!");

      } else {

         let launchStatus = document.getElementById("launchStatus");
         let faultyItems = document.getElementById("faultyItems");

         let pilotStatus = document.getElementById("pilotStatus");
         let copilotStatus = document.getElementById("copilotStatus");

         pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
         copilotStatus.innerHTML = `Pilot ${copilotName.value} is ready for launch`;


         let fuelStatus = document.getElementById("fuelStatus");
         let cargoStatus = document.getElementById("cargoStatus");

         if (isReadyForLaunch(Number(fuelLevel.value), Number(cargoMass.value))) {

            launchStatus.innerHTML = "Shuttle is ready for launch";
            launchStatus.style.color = "green";
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
            faultyItems.style.visibility = "visible";

         } else {

            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
            faultyItems.style.visibility = "visible";

            if (!checkFuel(Number(fuelLevel.value))) {
               fuelStatus.innerHTML = "Fuel level too low for launch";
            } else {
               fuelStatus.innerHTML = "Fuel level high enough for launch";
            } if (!checkCargo(Number(cargoMass.value))) {
               cargoStatus.innerHTML = "Cargo mass too high for launch";
            } else {
               cargoStatus.innerHTML = "Cargo mass low enough for launch";
            }

         };
      };
   });

   let json = [];

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
         const destination = document.getElementById("missionTarget");
         let index = Math.floor(Math.random()*6);
            destination.innerHTML = `
               <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[index].name}</li>
                  <li>Diameter: ${json[index].diameter}</li>
                  <li>Star: ${json[index].star}</li>
                  <li>Distance from Earth: ${json[index].distance}</li>
                  <li>Number of Moons: ${json[index].moons}</li>
               </ol>
               <img src=${json[index].image} height=250></img>    
            `;                
      });
   });

})


/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
