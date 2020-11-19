
const searchBox = document.querySelector("#searchbox");
var cities = [];

$(".submit").on("click",function (e) {
    e.preventDefault();
    if (city === "") {
        return
    } else {

        var city = $("#searchbox").val();
        cities.push(city);
    
        getWeather(city);
        renderButtons();
     }console.log(city);
 });

function getWeather(city) {
  
var queryURL = "https://www.api.openweathermap.org/data/2.5/weather?q=" + city + "61b8f3ca0e93255d3cff91108c79ff49";
console.log(city);
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("cityWeather").text(JSON.stringify(response));
  console.log(response);
  });
};

  function renderButtons() {
    // Deleting the buttons prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
// Looping through the array of movies
    for (var i = 0; i < cities.length; i++) {
      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of city to our button
      a.addClass("cities");
      // Adding a data-attribute
      a.attr("cityWeather", cities[i]);
      // Providing the initial button text
      a.text(cities[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }
  
//   api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key};