/* 
   User opens app
   User inputs superhero name in search box 1, clicks "Enter" button for stats
   User inputs superhero name in search box 2, clicks "Enter" button for stats
   User clicks "VS" button for head to head matchup
   Hero stats are compared 
   Through algorhithm created of hero stats, a head to head matchup winner is determined
   
   Weather icon with superhero as icon will be located somewhere on screen
   Hero icon will be assigned to weather condition (Heat, rain, snow, wind, hail, etc.)
   This will run when user adds ZIP code 
*/

// Your web app's Firebase configuration

/*
var firebaseConfig = {
   apiKey: "AIzaSyB2EKfaYb0g1N82L2rYGALQ4e2RcKQTSas",
   authDomain: "timesheet-91aa6.firebaseapp.com",
   databaseURL: "https://timesheet-91aa6.firebaseio.com",
   projectId: "timesheet-91aa6",
   storageBucket: "timesheet-91aa6.appspot.com",
   messagingSenderId: "1048436736797",
   appId: "1:1048436736797:web:2e159bdff5e5fe69"
 };
 */

// Initialize Firebase
// ================================================================

/*
 
firebase.initializeApp(firebaseConfig);

var heroArray = [""];

function searchSuperHero (superhero) {

  var queryURL = "https://superheroapi.com/api/10157235138196007/search/name";
  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      console.log(response);

    }

       */

// WEATHER STUFF



//     apiKey: c92d5aaad4a82504cb850e2089f5c6ff
//     apiCall: api.openweathermap.org/data/2.5/weather?zip={zip code},{1}


// weather.main
// main.temp

// This is our API key. Add your own API key between the ""
var APIKey = "26418792bafdcd3fe320935f49fe3ba5";

var imageData = [
  { type: "Rain", src: "assets/images/rain.png" },
  { type: "Snow", src: "assets/images/snow.png" },
  { type: "Clouds", src: "assets/images/clouds.png" },
  { type: "Clear", src: "assets/images/clear.png" },
  { type: "Drizzle", src: "assets/images/drizzle.png" },
  { type: "Thunderstorm", src: "assets/images/thunderstorm.png" },
  { type: "Tornado", src: "assets/images/Tornado.png"}
];


// Here we are building the URL we need to query the database
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip={" + zipCode + "},{1}" + APIKey;
$(document).on("click", ".weatherZipButton", function () {

    var weatherZip = $(".weatherZipSearch").val().trim();
    console.log(weatherZip);

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + weatherZip + ",us&units=imperial&appid=" + APIKey;
  
  
  var weatherTempCSS = $(".weatherTemp")
  var weatherTypeCSS = $(".weatherType")

  var weatherImageDiv = $(".weatherImageDiv");
  

    // We then created an AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

      var weatherTemp = response.main.temp;
      var weatherType = response.weather[0].main;

      // var holdTemp = $(".weatherTemp").text("Temp: " + weatherTemp);
      // var holdType = $(".weatherType").text("Type: " + weatherType);

      weatherTempCSS.text("Temp: " + weatherTemp);
      weatherTypeCSS.text("Type: " + weatherType);
      console.log(response);
      
      var weatherMatch = false;


      //looping through array to find match, changes flag from false to true if match is found
      for (var i = 0; i < imageData.length; i++) {
        console.log(imageData[i].type);
        if (imageData[i].type === weatherType) {
          var weatherTypeImage = imageData[i].src;
          weatherMatch = true;
          break;
        }
      };
// creates imag in image div wether flag changes or not
    var weatherImage = $("<img style='width:100%'>")    
      if (weatherMatch === true) {
        weatherImage.attr("src", weatherTypeImage);
      } else {
        weatherImage.attr("src", "assets/images/otherWeather.png");
      }
      weatherImageDiv.empty();
      weatherImageDiv.append(weatherImage);

    });

});