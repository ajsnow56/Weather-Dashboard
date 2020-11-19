var queryURL = "https://www.api.openweathermap.org/data/2.5/weather?q=" + city + "e594fa50e886d72a8c40dedbc92be7ed";
$.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    $("#cityWeather").text.JSON.stringify(response);
  });
