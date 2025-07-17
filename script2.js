// SELECT HTML ELEMENTS USING DOM SELECTORS

var searchInput = document.getElementById("searchInput");
var submitButton = document.getElementById("submit-btn");
var weatherInfo = document.getElementById('result-div')


submitButton.addEventListener("click" , async function (event) {
    event.preventDefault()
      var cityName = searchInput.value;
      var API_KEY = 'be09c981ada8150aba060a908edf8c62'

        if (!cityName) {
            alert("Please enter your city name");
        }
        try {
            // Await fetch call
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
            const data = await response.json()
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
            
            
        } catch (err) {
            alert('Error fetching weather Info')
            console.log(err);      
        }
})