// SELECT HTML ELEMENTS USING DOM SELECTORS

var searchInput = document.getElementById("searchInput");
var submitButton = document.getElementById("submit-btn");
var weatherInfo = document.getElementById("result-div");

// this function gets weather data using callback and XMLHttpRequest
function getWeather(cityName, callback) {
  console.log(cityName);
  var API_KEY = "3a2412d484ea9ec42389d6ab814a547d";
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

  var xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest

  xhr.onreadystatechange = function () {
    console.log(xhr.readyState);
    if (xhr.readyState === 4) {
      // 4 means the request is done
      // we use setTimeout to simulate asynchronous behavior
      setTimeout(function () {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          callback(null, data); // use the callback with no error and the data
        } else {
          callback("City not found", null); // use the callback with an error
        }
      }, 500); // delay to simulate async
    }
};
xhr.open("GET", url, true); // Open the request (true = async)
xhr.send();
}








submitButton.addEventListener("click", function (event) {
  event.preventDefault(); // cancel the default behavior

  var cityName = searchInput.value;

  if (!cityName) {
    alert("Please enter your city name");
  } else {
    getWeather(cityName, function (error, data) {
      console.log(data);
      if (error) {
        alert(error); // if there was an error
      } else {
        var temperature = data.main.temp;
        var location = data.name;
        var humidity = data.main.humidity;
        var windSpeed = data.wind.speed;

        weatherInfo.innerHTML = `
                <div class='result-div-inner'>
                    <h1> ${location} </h1> 
                    <h3> Temperature : ${temperature} °C</h3>
                    <h3>Humidity : ${humidity} %</h3>
                    <h3>Wind Speed : ${windSpeed} Km/h </h3>
                </div>`;
      }
    });
  }
});
