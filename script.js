// SELECT HTML ELEMENTS USING DOM SELECTORS

var searchInput = document.getElementById("searchInput");
var submitButton = document.getElementById("submit-btn");
var weatherInfo = document.getElementById('result-div')
submitButton.addEventListener("click", function (event) {
  event.preventDefault(); // cancel the default behavior
  var cityName = searchInput.value;
  var API_KEY = 'be09c981ada8150aba060a908edf8c62'

  if (!cityName) {
    alert("Please enter your city name");
  } else {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        response.json().then(function(data){
            if(data.cod == 404){
                alert('City not found')
            }else{

                var temperature = data.main.temp
                var location = data.name
                var humidity = data.main.humidity
                var windSpeed = data.wind.speed
                
                weatherInfo.innerHTML = `
                <div class='result-div-inner'>
                    <h1> ${location} </h1> 
                    <h3> Temperature : ${temperature} °C</h3>
                    <h3>Humidity : ${humidity} %</h3>
                    <h3>Wind Speed : ${windSpeed} Km/h </h3>
                </div>`
            }
        })
        
        
    })
  }
});
