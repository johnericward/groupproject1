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