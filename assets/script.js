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
var forecastWind = document.getElementById("forecast-wind");
var searchBtn = document.getElementById("search-button");
var cityForm = document.querySelector("#city-form");
var cityInput = document.querySelector("#city-text");
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
        <div><img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png"></div>
        <div>${item.weather[0].description}</div>
        <div>Temperature: ${item.main.temp} &deg;F</div>
        <div>Wind Speed: ${item.wind.speed} mph</div>
        <div>Humidity: ${item.main.humidity} %</div>
      `;
      document.getElementById("forecast").appendChild(forecastElement);
    });
  })
  .catch(error => console.log(error));

//   var cityHistory = [];
//   var cityList = document.getElementById("city-list");
// var cityHistoryList = document.getElementById("city-history-list");
// var cityHistorySpan = document.getElementById("city-history-span");

//   function renderCityHistory() {
  
//     cityHistoryList.innerHTML = "";
//     cityHistorySpan.textContent = cityHistory.length;
  
//     for (var i = 0; i < cityHistory.length; i++) {
//       var history = cityHistory[i];
  
//       var li = document.createElement("li");
//       li.textContent = history;
//       li.setAttribute("data-index", i);
  
//       var button = document.createElement("button");
//       button.textContent = "Complete ✔️";
  
//       li.appendChild(button);
//       cityList.appendChild(li);
//     }
//     }
//   function init() {
//     var storedCities = JSON.parse(localStorage.getItem("cityHistory"));
  
//     if (storedCities !== null) {
//       cityHistory = storedCities;
//     }
  
//     renderCityHistory();
//   }
  
//   function storedCities() {
//     localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
//   }
  
//   cityForm.addEventListener("submit", function(event) {
//     event.preventDefault();
  
//     var cityText = cityInput.value.trim();
  
//     if (cityText === "") {
//       return;
//     }
//     cityHistory.push(cityText);
//     cityInput.value = "";
  
//     storedCities();
//     renderCityHistory();
//   });
  
//   cityList.addEventListener("click", function(event) {
//     var element = event.target;
  
//     // Checks if element is a button
//     if (element.matches("button") === true) {
//       // Get its data-index value and remove the todo element from the list
//       var index = element.parentElement.getAttribute("data-index");
//       cityHistory.splice(index, 1);
  
      
//       storedCities();
//       renderCityHistory();
//     }
//   });
  
//   // Calls init to retrieve data and render it to the page on load
//   init()
  

// ;


  })
  
  }
  


 
searchBtn.addEventListener("click", getApi);



