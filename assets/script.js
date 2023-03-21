var currentCity = document.getElementById("city")
var currentIcon = document.getElementById("icon")
var currentTemp = document.getElementById("current-temp")
var weatherEl = document.getElementById("weather");
var forecastEl = document.getElementById("forecast");
var historyEl = document.getElementById("history");
var searchBtn = document.getElementById("search-button");
//apikey to make it easier
var apiKey = "763656d325fd4ae7170f7ec265c5aef0";

function getApi() {
  
  var requestUrl = "api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey";

  // Make API request using fetch()
  fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      // Process the weather data
      console.log(data);
    })
    .catch(error => {
      // Handle API request error
      console.error(error);
    });
}

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
        $("#currentUv").text(" " + data.current.uvi);
      })
    })
}
//   //search temperature
//   //var temp = document.createElement("div");
//   //temp.textContent = "Temperature Is: " + data.main.temp + " F";
//   //temp.classList = "current-list-group";

//   fetch('requesturl')
//   .then(response => response.json())
//   .then(data => {
//     const temperature = document.createElement("div");
//     temperature.textContent = "Temperature Is: " + data.main.temp + " F";
//     temperature.classList = "current-list-group";
//     // add the temperature element to the DOM
//     document.body.appendChild(temperature);
  
//   .catch(error => console.error(error));
// });
//   //by city
//   // var cityEl = document.createElement('h2');
//   // cityEl.textContent = data.name;
//   // cityEl.classList = "current-list-group";


//   //wind
//   var windSpeed = document.createElement("div");
//   windSpeed.textContent = "Wind Speed Is: " + data.wind.speed + "MPH ";
//   windSpeed.classList = "current-list-group";

//   //humidity
//   var humidity = document.createElement("div");
//   humidity.textContent = "Humidity Is: " + data.main.humidity + "% ";
//   humidity.classList = "current-list-group";

//   //icon
//   var iconEl = document.createElement(`img`);
//   iconEl.setAttribute(
//     "src",
//     'https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'
//   );
//   cityEl.appendChild(iconEl);
  
//   //current date
//   function todayDate() {
//     var today = dayjs();
//     $("#currentDate").text(today.format("dddd - MMMM D, YYYY"));
  
//   }
//   //put together
//   weatherEl.innerHTML = "";
//   weatherEl.append(cityEl, temperature, humidity, windSpeed);
//   var lon = data.coord.lon;
//   var lat = data.coord.lat;
//   getWeather(lat, lon);


//   //cities
//   var citySearch = document.createElement('h2');
//   citySearch.textContent = data.name;
//   window.localStorage.setItem("h2", data.name);
//   window.localStorage.getItem("h2");
//   historyEl.append(citySearch);


  

//   //UV
// function getWeather(lat, lon) {
//   var queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
//   fetch(queryURL)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(data)

//   var uvIndex = document.createElement("div");
//   uvIndex.textContent = "UV Index: " + data.value;
//   console.log(data.value);
//   uvIndex.classList = "current-list-group";
//   weatherEl.appendChild(uvIndex);
      
// })
// }

//   // 5 day forecast
// function getForecast() {
//   var searchValue = document.getElementById("search-city").value;
//   var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=imperial&appid=${apiKey}`;

//   fetch(fiveDayUrl)
//     .then((response) => response.json())
//     .then(function (data) {
//       forecastEl.innerHTML = "";
//       for (let i = 0; i < data.list.length; i += 8) {
//         var div = document.createElement("div");
//         div.style.display = "inline-block";
//         div.setAttribute("class", "col-md-2  col-sm-4");

//         //date
//         var forecastCurrentDate = document.createElement("div")
//         forecastCurrentDate.textContent = moment(data.list[i].dt_txt).calendar("MMM D, YYYY");

//         //temp
//         var forecastTemp = document.createElement("div");
//         forecastTemp.textContent = "Temperature: " + data.list[i].main.temp + " F";
//         forecastTemp.classList = "five-day-list-group";

//         //humidity
//         var forecastHumidity = document.createElement("div");
//         forecastHumidity.textContent =
//           "Humidity: " + data.list[i].main.humidity + "% ";
//         forecastHumidity.classList = "five-day-list-group";

//         //icon
//         var pic = data.list[i].weather[0].icon;
//         var forecastIcon = document.createElement("img");
//         forecastIcon.setAttribute(
//           "src",
//           `https://openweathermap.org/img/wn/${pic}@2x.png`
//         );
//         forecastHumidity.appendChild(forecastIcon);

//         forecastTemp.appendChild(forecastHumidity);
//         forecastCurrentDate.appendChild(forecastTemp);
//         div.appendChild(forecastCurrentDate);
//         forecastEl.appendChild(div);
//       }
//     });
// }

// searchBtn.addEventListener("click", getApi);
// searchBtn.addEventListener("click", getForecast);
// window.addEventListener("load", function () {
//     window.localStorage.getItem("historyEl");
// })