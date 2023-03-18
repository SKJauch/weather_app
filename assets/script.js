var weatherEl = document.getElementById('weather');
var forecastEl = document.getElementById('forecast');
var historyEl = document.getElementById('history');
var searchBtn = document.getElementById('search-button');
//apikey to make it easier
var apiKey = '763656d325fd4ae7170f7ec265c5aef0';

function getApi() {
    var searchValue = document.getElementById('search-city').value;
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}&units=imperial`;
  
    fetch(requestUrl)
    .then((response) => response.json())
    .then((data) => console.log(data));
    
 //search temperature       
        var temperature = document.createElement('div')
        temperature.textContent = "Temperature Is: " + data.main.temperature + " F";
        temperature.classList = "current-list-group";
//by city
        var cityEl = document.createElement(h2);
        cityEl.textContent = data.name;
//wind
        var windSpeed = document.createElement ('div');
        windSpeed.textContent = "Wind Speed Is: " + data.wind.speed + "MPH ";
        windSpeed.classList = "current-list-group";
//humidity
        var humidity = document.createElement('div');
        humidity.textContent = "Humidity Is: " + data.main.humidity + "% ";
        humidity.classList = "current-list-group";
//icon
        var iconEl = document.createElement("img");
        iconEl.setAttribute("src", 'https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png');
        cityEl.appendChild(currentDate);
//put together
        weatherEl.innerHTML = '';
        weatherEl.append(cityEl, temperature, humidity, windSpeed);
        var long = data.coord.long;
        var lati = data.coord.lati;
        getWeather(lati,long);
//cities            
        var citySearch = document.createElement(h2);
        citySearch.textContent = data.name;
        window.localStorage.setItem("h3", data.name);
        window.localStorage.getItem("h3");
        historyEl.append(citySearch); 

    };

//UV
function getUv(lati, long) {
    var queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lati}&lon=${long}`;
    fetch(queryURL)
    .then((response) => response.json())
    .then((data) => console.log(data));
  
        var uvIndex = document.createElement('div');
        uvIndex.textContent = "UV Index: " + data.value;
        console.log(data.value)
        uvIndex.classList = "current-list-group"
        containerWeather.appendChild(uvIndex)    
      
    }  

    
  searchButton.addEventListener('click', getApi);