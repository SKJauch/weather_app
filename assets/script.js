var weatherEl = document.getElementById("weather");
var forecastEl = document.getElementById("forecast");
var history = document.getElementById("history");
var searchBtn = document.getElementById("search-button");
//debug below
var temperature = document.createElementById("temperature")
var cityEl = document.createElementById("city")
var windSpeed = document.createElementById("wind-speed")
var humidity = document.createElementById("humidity")
var iconEl = document.createElementById("icon")
var uvIndex = document.createElement("uv-index")
var long = data.coord.long;
var lati = data.coord.lati
//debug above
//apikey to make it easier
var apiKey = "763656d325fd4ae7170f7ec265c5aef0";

function getApi() {
  var searchValue = document.getElementById("search-city").value;
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}&units=imperial`;

  fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    $('#search-city').val('')

  //search temperature
  //var temperature = document.createElement("div");
  temperature.textContent = "Temperature Is: " + data.main.temperature + " F";
  temperature.classList = "current-list-group";
  //by city
  //var cityEl = document.createElement('h2');
  cityEl.textContent = data.name;
  //wind
  //var windSpeed = document.createElement("div");
  windSpeed.textContent = "Wind Speed Is: " + data.wind.speed + "MPH ";
  windSpeed.classList = "current-list-group";
  //humidity
  //var humidity = document.createElement("div");
  humidity.textContent = "Humidity Is: " + data.main.humidity + "% ";
  humidity.classList = "current-list-group";
  //icon
  //var iconEl = document.createElement("img");
  iconEl.setAttribute(
    "src",
    "https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
  );
  cityEl.appendChild(currentDate);
  //put together
  weatherEl.innerHTML = "";
  weatherEl.append(cityEl, temperature, humidity, windSpeed);
  var long = data.coord.long;
  var lati = data.coord.lati;
  getWeather(lati, long);
  //cities
  var citySearch = document.createElement('h2');
  citySearch.textContent = data.name;
  window.localStorage.setItem("h2", data.name);
  window.localStorage.getItem("h2");
  historyEl.append(citySearch);
  })

  

  //UV
function getWeather(lati, long) {
  var queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lati}&lon=${long}`;
  fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)

  //var uvIndex = document.createElement("div");
  uvIndex.textContent = "UV Index: " + data.value;
  console.log(data.value);
  uvIndex.classList = "current-list-group";
  weatherEl.appendChild(uvIndex);
      
})
}

  // 5 day forecast
function getForecast() {
  var searchValue = document.getElementById("search-city").value;
  var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=imperial&appid=${apiKey}`;

  fetch(fiveDayUrl)
    .then((response) => response.json())
    .then(function (data) {
      forecastEl.innerHTML = "";
      for (let i = 0; i < data.list.length; i += 8) {
        var div = document.createElement("div");
        div.style.display = "inline-block";
        div.setAttribute("class", "col-md-2  col-sm-4");

        //date
        var forecastCurrentDate = document.createElement("div");
        forecastCurrentDate.textContent = moment(data.list[i].dt_txt).calendar(
          "MMM D, YYYY"
        );

        //temp
        var forecastTemp = document.createElement("div");
        forecastTemp.textContent = "Temp: " + data.list[i].main.temp + " F";
        forecastTemp.classList = "five-day-list-group";

        //humidity
        var forecastHumidity = document.createElement("div");
        forecastHumidity.textContent =
          "Humidity: " + data.list[i].main.humidity + "% ";
        forecastHumidity.classList = "five-day-list-group";

        //icon
        var pic = data.list[i].weather[0].icon;
        var forecastIcon = document.createElement("img");
        forecastIcon.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${pic}@2x.png`
        );
        forecastHumidity.appendChild(forecastIcon);

        forecastTemp.appendChild(forecastHumidity);
        forecastCurrentDate.appendChild(forecastTemp);
        div.appendChild(forecastCurrentDate);
        forecastEl.appendChild(div);
      }
    });
}

searchBtn.addEventListener("click", getApi);
searchBtn.addEventListener("click", getForecast);
window.addEventListener("load", function () {
window.localStorage.getItem("history");
});
