
//===============================================================================================================
//===================================== ERIC'S WEATHER STUFF ====================================================
//===============================================================================================================

// API Key for Open Weather Map
var APIKey = "26418792bafdcd3fe320935f49fe3ba5";

// array of objects to compare weather types returned by API and add in our own images of super heroes
var imageData = [
  { type: "Rain", src: "assets/images/rain.png" },
  { type: "Snow", src: "assets/images/snow.png" },
  { type: "Clouds", src: "assets/images/clouds.png" },
  { type: "Clear", src: "assets/images/clear.png" },
  { type: "Drizzle", src: "assets/images/drizzle.png" },
  { type: "Thunderstorm", src: "assets/images/thunderstorm.png" },
  { type: "Tornado", src: "assets/images/Tornado.png"}
];


// this js only runs when user clicks the submit ZIP button at top right of page
$(document).on("click", ".weatherZipButton", function () {

  // grabs whatever user types into input field and stores it in weatherZip variable
    var weatherZip = $(".weatherZipSearch").val().trim();
    console.log(weatherZip);

  //this is API url using my API key and concatinating ZIP entered in the input field stored in weatherZIP variable
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + weatherZip + ",us&units=imperial&appid=" + APIKey;
  
  //these are to link the divs in the HTML with the js
  var weatherTempCSS = $(".weatherTemp")
  var weatherTypeCSS = $(".weatherType")

  var weatherImageDiv = $(".weatherImageDiv");
  

    // AJAX call - i have a poor understanding of this part
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

      // variables to contain specific parts of the data being sent over from OPEN WEATHER MAP API
      var weatherTemp = response.main.temp;
      var weatherType = response.weather[0].main;
      
      // this sticks variables storing the API info into the variables linked to the CSS
      weatherTempCSS.text("Temp: " + weatherTemp);
      weatherTypeCSS.text("Type: " + weatherType);
      console.log(response);
      

      // this enables a condition for when the API returns odd responses I dont have preprogrammed images for
      var weatherMatch = false;


      //looping through array of objects for images to find match, changes flag from false to true if match is found
      for (var i = 0; i < imageData.length; i++) {
        console.log(imageData[i].type);
        if (imageData[i].type === weatherType) {
          var weatherTypeImage = imageData[i].src;
          weatherMatch = true;
          break;
        }
      };
// creates image in image div wether flag changes or not
    var weatherImage = $("<img style='width:100%'>")    
      if (weatherMatch === true) {
        weatherImage.attr("src", weatherTypeImage);
      } else {
        // this is the else where if no matches are found, condition stays false and it kicks in this default image of mysterio instead of a custom character for the weather
        weatherImage.attr("src", "assets/images/otherWeather.png");
      }
      // this empties the image div to make sure it is clear before displaying an image so that especially if you start searching multiple ZIP's it doesn't append the images together showing multiple images at once
      weatherImageDiv.empty();
      weatherImageDiv.append(weatherImage);

    });

});

//===============================================================================================================
//======================================== END WEATHER STUFF ====================================================
//===============================================================================================================

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
var heroArray = [""];


function displayheroinfo(heroPick) {
  // console.log("my function works");


  var queryURL = "https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/10157235138196007/search/" + heroPick
  console.log(queryURL);


  var charImageCSS = $(".charImage")
  var powerStatsCSS = $(".powerStats")

  var charImageBeta = $(".charImageTwo")
  var powerStatsBeta = $(".powerStatsTwo")

  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: 'json'

  }).then(function (playerOne) {
    console.log(playerOne);

    

    var charImage = playerOne.results[0].image;
    console.log(charImage.url);

    var powerStats = playerOne.results[0].powerstats;
    console.log(powerStats.combat);

    
    charImageCSS.attr("src", charImage.url);

    powerStatsCSS.attr(powerStats);
    var combat = $("<p>").text("Combat: " + powerStats.combat);
    console.log(powerStats.combat);

    var durability = $("<p>").text("Durability: " + powerStats.durability);
    console.log(powerStats.durability);

    var intelligence = $("<p>").text("Intelligence: " + powerStats.intelligence);
    console.log(powerStats.intelligence);

    var power = $("<p>").text("Power: " + powerStats.power);
    console.log(powerStats.power);

    var speed = $("<p>").text("Speed: " + powerStats.speed);
    console.log(powerStats.speed);

    var strength = $("<p>").text("Strength: " + powerStats.strength);
    console.log(powerStats.strength);

    $(".powerStats").append(combat);
    $(".powerStats").append(durability);
    $(".powerStats").append(intelligence);
    $(".powerStats").append(power);
    $(".powerStats").append(speed);
    $(".powerStats").append(strength); 
  

}).then(function (playerTwo) {
  console.log(playerTwo);

  var charImageTwo = playerTwo.results[0].image;
    console.log(charImageTwo.url);

    var powerStatsTwo = playerTwo.results[0].powerstats;
    console.log(powerStatsTwo.combat);

    charImageBeta.attr("src", charImageTwo.url);

    powerStatsBeta.attr(powerStatsTwo);
    var combat = $("<p>").text("Combat: " + powerStatsTwo.combat);
    console.log(powerStatsTwo.combat);

    var durability = $("<p>").text("Durability: " + powerStatsTwo.durability);
    console.log(powerStatsTwo.durability);

    var intelligence = $("<p>").text("Intelligence: " + powerStatsTwo.intelligence);
    console.log(powerStatsTwo.intelligence);

    var power = $("<p>").text("Power: " + powerStatsTwo.power);
    console.log(powerStatsTwo.power);

    var speed = $("<p>").text("Speed: " + powerStatsTwo.speed);
    console.log(powerStatsTwo.speed);

    var strength = $("<p>").text("Strength: " + powerStatsTwo.strength);
    console.log(powerStatsTwo.strength);

    $(".powerStatsTwo").append(combat);
    $(".powerStatsTwo").append(durability);
    $(".powerStatsTwo").append(intelligence);
    $(".powerStatsTwo").append(power);
    $(".powerStatsTwo").append(speed);
    $(".powerStatsTwo").append(strength);

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

