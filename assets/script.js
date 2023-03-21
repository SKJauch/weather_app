var currentCity = document.getElementById("city");
var currentIcon = document.getElementById("icon");
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById("wind");
var currentHumidity = document.getElementById("humidity");
var currentUvi = document.getElementById("uv");
var forecastDate = document.getElementById("forecast-date");
var forecastTemp = document.getElementById("forecast-temp");
var forecastHumidity = document.getElementById("forecast-humidity");
var forecastIcon = document.getElementById("forecast-icon");
var forecastWind =document.getElementById("forecast-wind");
var weatherEl = document.getElementById("weather");
var forecastEl = document.getElementById("forecast");
var historyEl = document.getElementById("history");
var searchBtn = document.getElementById("search-button");
//apikey to make it easier
var apiKey = "763656d325fd4ae7170f7ec265c5aef0";

// function getApi() {
  
//   var requestUrl = "api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey"

 
//   fetch(requestUrl)
//     .then(response => response.json())
//     .then(data => {
//       // Process the weather data
//       console.log(data);
//     })
//     .catch(error => {
//       // Handle API request error
//       console.error(error);
//     });
// }

function search(city) {
  var latLon = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=&appid=" + apiKey;
  fetch(latLon)
    .then((response) => {
      return response.json();
    }).then((data) => {
        if (!data.length) {
          return alert("Please Enter City");
        }
      return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=hourly,minutely&units=imperial&appid=" + apiKey)
      .then((response) => {
        return response.json();
      }).then((data) => {

        $("#currentCity").text(city + " " + "(" + moment.unix(data.current.dt).utcOffset(data.timezone_offset / 60).format("MM/DD?YYYY") + ")");
        $("#currentIcon").attr("src", "https://openweathermap.org/img/wn" + data.current.weather[0].icon + "png");
        $("#currentTemp").text(" " + Math.floor(data.current.temp) + "\u0080 F");
        $("#currentWind").text(" " + data.current.wind_speed + " MPH");
        $("#currentHumidity").text(" " + data.current.humidity + "\%");
        $("#currentUvi").text(" " + data.current.uvi);


        let uvi = data.current.uvi;
        let currentUv = $(#currentUv);
        if (uvi <= 3) {
          currentUv.removeClass().addClass("green");
        } else if (uvi > 3 && uvi <= 6) {
          currentUv.removeClass().addClass("orange");
        } else if (uvi > 6 && uvi <= 10) {
          currentUv.removeClass().addClass("red");
        } else {
          currentUv.removeClass()addClass("blue")
        }

        forecastData.forEach(item => {
          const forecastElement = document.createElement("div");
          forecastElement.innerHTML = `
            <div>${item.dt_txt}</div>
            <div>${item.weather[0].description}</div>
            <div>${item.main.temp} &deg;C</div>
          `;
          document.getElementById("forecast-container").appendChild(forecastElement);
        });
      })
      .catch(error => console.log(error));

    
    })
  }
    

searchBtn.addEventListener("click", getApi);
searchBtn.addEventListener("click", getForecast);
window.addEventListener("load", function () {
    window.localStorage.getItem("historyEl");
})