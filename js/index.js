document.addEventListener("DOMContentLoaded", ()=>{
  getWeatherData()
})

function getWeatherData(){
  const displaySection = document.querySelector("#display-section")
  const cityForm = document.querySelector("#city-form")
  const city = document.querySelector("#city")
  cityForm.addEventListener("submit",(event)=>{

    event.preventDefault()

    const cityName = city.value
    const appKey = 'd80e6647e32d60a5868d475d584ac6f2';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appKey}`)
    .then(res => res.json())
    .then (data => {
      console.log(data)
    })
    event.target.reset()
  })
}