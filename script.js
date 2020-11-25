const searchBox = document.querySelector("#searchbox");
var cities = [];

if (localStorage.getItem("city")) {
  var storedCities = JSON.parse(localStorage.getItem("city"));
  cities = storedCities;
  var city = storedCities[storedCities.length - 1];

  getWeather(city);
  // console.log(city);
  renderButtons();
}

$(".submit").on("click", function (e) {
  e.preventDefault();
  if (city === "") {
    return;
  } else {
    var city = $("#searchbox").val();
    cities.push(city);
    localStorage.setItem("city", JSON.stringify(cities));
    renderButtons();
    getWeather(city);
  }
});

function getWeather(city) {
  $("#hereforecast").empty();
  $("#temp").empty();
  $("#humidity").empty();
  $("#windSpeed").empty();

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=61b8f3ca0e93255d3cff91108c79ff49";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function displayWeather(response) {
    // console.log(response);
    $("#cityWeather").text(JSON.stringify(response));
    $("#cityName").html(response.name);
    // console.log(response.name);
    $("#temp").html(response.main.temp);
    $("#humidity").html(response.main.humidity);
    $("#windSpeed").html(response.wind.speed);
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

      var cardBody = $("<cardBody>").addClass("card col-md-2");
      var img = $('<img id="wficon">');
      var cardD = $("<cardDate>").html(foreDates);
      cardD.appendTo(cardBody);
      img.attr("src", "http://openweathermap.org/img/wn/" + wicon + "@2x.png");
      img.appendTo(cardBody);
      var cardT = $("<cardTemp>").html("Temperate: " + foreTemp + "F");
      var cardH = $("<cardHumidity>").html("Humidity: " + foreHum);
      cardT.appendTo(cardBody);
      cardH.appendTo(cardBody);
      cardBody.appendTo("#hereforecast");
    }
  });
}

function renderButtons() {
  $("#buttons-view").empty();

  for (var i = 0; i < cities.length; i++) {
    var a = $("<button>");
    // Adding a class of city to our button
    a.addClass("cities");
    // Adding a data-attribute
    a.attr("data-cityWeather", cities[i]);
    // Providing the initial button text
    a.text(cities[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").prepend(a);
  }
}
$(".cities").on("click", function (e) {
  e.preventDefault();
  city = $(this).attr("data-cityWeather");
  getWeather(city);
});
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key} //
