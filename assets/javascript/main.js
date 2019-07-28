/* 
   User opens app
   User inputs superhero name in search box 1, clicks "Enter" button for stats
   User inputs superhero name in search box 2, clicks "Enter" button for stats
   User clicks "VS" button for head to head matchup
   Hero stats are compared 
   Through algorhithm created of hero stats, a head to head matchup winner is determined
   
   Weather icon with superhero as icon will be located somewhere on screen
   Hero icon will be assigned to weather condition (Heat, rain, snow, wind, hail, etc.)
   This will run automatically each time page is refreshed with most up to date weather
*/

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB2EKfaYb0g1N82L2rYGALQ4e2RcKQTSas",
  authDomain: "timesheet-91aa6.firebaseapp.com",
  databaseURL: "https://timesheet-91aa6.firebaseio.com",
  projectId: "timesheet-91aa6",
  storageBucket: "timesheet-91aa6.appspot.com",
  messagingSenderId: "1048436736797",
  appId: "1:1048436736797:web:2e159bdff5e5fe69"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Array of Superhero's
var heroArray = ["Hulk", "Ironman", "Thanos", "Spiderman"];


function displayheroinfo(heroPick) {
  // console.log("my function works");

    
    var queryURL = "https://superheroapi.com/api/10157235138196007/search/" + heroPick 
    console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET",
    
  }).then(function (response) {
     console.log(response);

     // Creating a div to hold the hero
     var heroDiv = $("<div class='hero'>");

     // Retrieving the URL for the image
     var imgURL = response.Poster;

     // Creating an element to hold the image
     var image = $("<img>").attr("src", imgURL);

     // Appending the image
     heroDiv.append(image);

     // Storing the rating data
     var stats = response.powerstats;

     // Creating an element to have the stats displayed
     var pOne = $("<p>").text("Power Stats: " + stats);

     // Displaying the stats
     heroDiv.append(pOne);

   });
}


$("#heroAbtn").on("click", function (event) {
  event.preventDefault();
  console.log("click");

  var heroA = $("#heroA").val();
  console.log(heroA);

  displayheroinfo(heroA);

  heroArray.push(heroA);
})

$("#heroBbtn").on("click", function (event) {
  event.preventDefault();
  console.log("click");

  var heroB = $("#heroB").val();
  console.log(heroB);

  displayheroinfo(heroB);
  console.log(heroB);

  heroArray.push(heroB);
})