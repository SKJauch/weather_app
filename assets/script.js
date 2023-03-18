var weatherEl = document.getElementById('weather');
var forecastEl = document.getElementById('forecast');
var historyEl = document.getElementById('history');
var searchBtn = document.getElementById('search-button');
//apikey to make it easier
var apiKey = '763656d325fd4ae7170f7ec265c5aef0';

function getApi() {
    var searchValue = document.getElementById('search-city').value;
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${APIkey}&units=imperial`;
  
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        $('#search-city').val('')
 //search temperature       
        var temperature = document.createElement('div')
        temperature.textContent = "Temperature: " + data.main.temperature + " F";
        temperature.classList = "current-list-group";
//by city
        var cityEl = document.createElement(h2);
        cityEl.textContent = data.name;
//wind
        var windSpeed = document.createElement ('div');
        windSpeed.textContent = "Wind Speed: " + data.wind.speed + "MPH ";
        windSpeed.classList = "current-list-group";
//humidity
                
        })