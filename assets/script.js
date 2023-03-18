var weatherEl = document.getElementById('weather');
var forecastEl = document.getElementById('forecast');
var historyEl = document.getElementById('history');
var searchBtn = document.getElementById('search-button');
var APIkey = '763656d325fd4ae7170f7ec265c5aef0';

function getApi() {
    var searchValue = document.getElementById('search-city').value;
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${APIkey}&units=imperial`;
  