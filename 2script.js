const searchBox = document.querySelector("#searchbox");
var cities = [];

$(".submit").on("click", function (e) {
  e.preventDefault();
  if (city === "") {
    return;
  } else {
    var city = $("#searchbox").val();
    cities.push(city);

    getWeather(city);
    renderButtons();
  }
});

function getWeather(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=61b8f3ca0e93255d3cff91108c79ff49";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function displayWeather(response) {
    console.log(response);
    $("#cityWeather").text(JSON.stringify(response));
    $("#cityName").html(response.name);
    console.log(response.name);
    $("#temp").html(response.main.temp);
    $("#humidity").html(response.main.humidity);
    $("#windSpeed").html(response.wind.speed);
    // console.log(response.weather[0].icon);
    // const wicon = response.weather[0].icon;
    // const wurl = "http://openweathermap.org/img/wn/" + wicon + "@2x.png";
  });
  var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=61b8f3ca0e93255d3cff91108c79ff49";

  $.ajax({
    url: forecastURL,
    method: "GET",
  }).then(function (response) {
    // console.log(response);

    for (i = 0; i <= 5; i++) {
      let foreDates = response.list[8 * i].dt_txt.substring(0, 10);
      let foreTemp = response.list[8 * i].main.temp;
      let foreHum = response.list[8 * i].main.humidity;
      let wicon = response.list[8 * i].weather[0].icon;
      // console.log(foreDates, foreTemp, foreHum);
      rendercard(foreDates, foreTemp, foreHum, wicon);
    }

  });
}
function rendercard(foreDates, foreTemp, foreHum, wicon) {
  var cardBody = $("<cardBody>").addClass("card col-md-2")
  var img = $('<img id="wficon">');
  var cardD = $("<cardDate>").html(foreDates);
  cardD.appendTo(cardBody);
  img.attr("src", "http://openweathermap.org/img/wn/" + wicon + "@2x.png");
  img.appendTo(cardBody);
  var cardT = $("<cardTemp>").html("Temperate: " + foreTemp);
  var cardH = $("<cardHumidity>").html("Humidity: " + foreHum);
  cardT.appendTo(cardBody);
  cardH.appendTo(cardBody);
  cardBody.appendTo("#hereforecast");
}
// $("#dayforecast").on('click', function (e) {
//   console.log(this);
// }
// );

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
    $("#buttons-view").prepend(a);
  }
}

// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key} //
