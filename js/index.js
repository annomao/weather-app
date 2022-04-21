document.addEventListener("DOMContentLoaded", ()=>{
  getWeatherByCoordinates()
  getWeatherCityData()
})
// global variables
const appKey = 'd80e6647e32d60a5868d475d584ac6f2';
const metric = "metric"

//function that does fetching
function fetchData(url){

  fetch(url)
  .then(res => {
    if(res.ok) return res.json(); 
        else throw new Error("Sorry! We could not find information for the requested city")
  })
  .then (data => {
    renderWeatherInfo(data)
  })
  .catch(error => {
    handleError(error)
  })
}

function handleError(error){
  const weatherSummary = document.querySelector(".weather-summary")
  const p = document.createElement("p")
  p.id = "error"
  p.style.color = "red"
  p.style.marginTop = "1em"
  p.innerText = error
  let parentDiv = weatherSummary.parentNode
  parentDiv.insertBefore(p,weatherSummary)
}

function getWeatherCityData(){

  const cityForm = document.querySelector("#city-form")
  const city = document.querySelector("#city-input")

  cityForm.addEventListener("submit",(event)=>{
    event.preventDefault()

    const cityName = city.value
    const cityUrl =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appKey}&units=${metric}`
    fetchData(cityUrl)
    event.target.reset()
  })
}

// function to get weather using coordintes 
function getWeatherByCoordinates(){
  let long;
  let lat;
  // Accessing Geolocation of User using buitl in navigator obj and methods
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${appKey}&units=${metric}`
      fetchData(geoUrl)
    });
  }
}

// function to display weather data based on city input
function renderWeatherInfo(data){

  let dt = new Date(data.dt * 1000)
  let iconUrl=`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`


  const errorText = document.querySelector("#error")
  if(errorText){errorText.textContent = ""}
  

  const weatherDetails = document.querySelector("#weather-details")
  const weatherSummary = document.querySelector(".weather-summary")

  weatherSummary.innerHTML = `
  <p id="city">${data.name}</p>
  <p id="degrees">${data.main.temp}&#8451</p>
  <img src=${iconUrl} alt=${data.weather[0].description}/>
  <span id="weather-description">${data.weather[0].main}</span>
  <p id="time">${dt}</p> `

  weatherDetails.innerHTML = `
  <h4>Weather Details</h4>
  <table class="table table-borderless">
    <tbody>
      <tr>
        <th>Weather</th>
        <td>${data.weather[0].description}</td>
      </tr>
      <tr>
        <th>Cloudy</th>
        <td>${data.clouds.all}%</td>
      </tr>
      <tr>
        <th>Temperature</th>
        <td>${data.main.temp}&#8451;</td>
      </tr>
      <tr>
        <th>Humidity</th>
        <td>${data.main.humidity}</td>
      </tr>
      <tr>
        <th>Wind</th>
        <td>${data.wind.speed}m/s</td>
      </tr>
      <tr>
        <th>Visibility</th>
        <td>${(data.visibility)/1000}km</td>
      </tr>
    </tbody>
  </table>
  <div id="vote">
  <p>How are we feeling about the weather today?</p>
  <button id="thumb-up"><i class="fa fa-thumbs-up"></i><span>0</span></button>
  <button id="thumb-down"><i class="fa fa-thumbs-down"></i><span>0</span></button>
  </div>
  `
  document.querySelector("#thumb-up").addEventListener("click",addThumbsEvent)
  document.querySelector("#thumb-down").addEventListener("click",addThumbsEvent)
}
 //function to handle click events

function addThumbsEvent(event){
  let currentNumber = Number(event.target.parentNode.lastChild.innerText)
  currentNumber +=1
  event.target.parentNode.lastChild.innerText= currentNumber
}