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


function displayheroinfo(heroPick, classname) {
  var classname = classname
  var queryURL = "https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/10157235138196007/search/" + heroPick
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: 'json'

  }).then(function (playerOne) {
    console.log(playerOne);

    getHeroInfo(playerOne, classname);

  
  })
}



$("#heroAbtn").on("click", function (event) {
  event.preventDefault();
  $( ".powerStats p" ).empty();
  console.log("click");

  var heroA = $("#heroA").val();
  console.log(heroA);

  displayheroinfo(heroA, '.powerStats');

  heroArray.push(heroA);
})

$("#heroBbtn").on("click", function (event) {
  event.preventDefault();
  $( ".powerStatsTwo p" ).empty();
  console.log("click");

  var heroB = $("#heroB").val();
  console.log(heroB);

  displayheroinfo(heroB, '.powerStatsTwo');
  console.log(heroB);

  heroArray.push(heroB);
})

$("#combatbtn").on("click", function (event) {
  event.preventDefault();

  var heroA = $(".powerStats .combat").data("combat");
  var heroB = $(".powerStatsTwo .combat").data("combat");
  var heroAName = $(".powerStats .name").data("name");
  var heroBName = $(".powerStatsTwo .name").data("name");
  console.log(heroA);
  console.log(heroB);

  if (heroA > heroB) {
    alert(heroAName + " Winner A");
  } else if (heroA < heroB) {
    alert(heroBName + " Winner B");
  } else  
    alert("Draw");
  
})

function getHeroInfo(playerOne, classname) {
  console.log('classname: ' + classname)

  if (classname === ".powerStats") {
    var charImageCSS = $(".charImage");
    var powerStatsCSS = $(".powerStats")
  } else if (classname === ".powerStatsTwo"){
    var charImageCSS = $(".charImageTwo");
    var powerStatsCSS = $(".powerStatsTwo")
  }
  

 console.log(playerOne);
  var charImage = playerOne.results[0].image;
  console.log(charImage.url);
  var powerStats = playerOne.results[0].powerstats;
  console.log(powerStats.combat);
  console.log(playerOne.results[0].name);


  charImageCSS.attr("src", charImage.url);

  powerStatsCSS.attr(powerStats);
  var name = $("<p>").text("Name: " + playerOne.results[0].name);
  name.addClass("name")
  name.attr("data-name", playerOne.results[0].name)

  var combat = $("<p>").text("Combat: " + powerStats.combat);
  combat.addClass("combat")
  combat.attr("data-combat", powerStats.combat)
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

  $(classname).append(name);
  $(classname).append(combat);
  $(classname).append(durability);
  $(classname).append(intelligence);
  $(classname).append(power);
  $(classname).append(speed);
  $(classname).append(strength); 



};
