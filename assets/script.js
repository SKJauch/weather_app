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
var searchBtn = document.getElementById("search-button");
//apikey to make it easier
var apiKey = "763656d325fd4ae7170f7ec265c5aef0";

function getApi() {
  const searchValue = document.getElementById('search-city').value;
  search(searchValue)
}

function search(city) {
  
      fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&exclude=hourly,minutely&units=imperial&appid=" + apiKey)
      .then((response) => {
        return response.json();
      }).then((data) => {
console.log(data)
        $("#currentCity").text(city + " " + "(" + moment.unix(data.dt).utcOffset(data.timezone / 60).format("MM/DD/YYYY") + ")");
        $("#currentIcon").attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
        $("#currentTemp").text(" " + Math.floor(data.main.temp) + " ° F");
        $("#currentWind").text(" " + data.wind.speed + " MPH");
        $("#currentHumidity").text(" " + data.main.humidity + "\%");
        

        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + apiKey)
  .then(response => response.json())
  .then(data => {
    // Extract the forecast data for the next 5 days
    const forecastData = data.list.filter(item => {
      return item.dt_txt.includes("12:00:00");
    }).slice(0, 5);
    
    // Loop through the forecast data and create HTML elements to display it
    forecastData.forEach(item => {
      console.log(item)
      const forecastElement = document.createElement("section");
      forecastElement.innerHTML = `
        <div>${(moment.unix(item.dt).utcOffset(item.timezone / 60).format("MM/DD/YYYY"))}</div>
        <div>${item.weather[0].description}</div>
        <div>Temperature: ${item.main.temp} &deg;F</div>
        <div>Wind Speed: ${item.wind.speed} mph</div>
        <div>Humidity: ${item.main.humidity} %</div>
      `;
      document.getElementById("forecast").appendChild(forecastElement);
    });
  })
  .catch(error => console.log(error));


  })


}

searchBtn.addEventListener("click", getApi);
window.localStorage.getItem("search-city");