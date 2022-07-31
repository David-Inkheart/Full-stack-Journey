// init storage
const storage = new storage();
// get stored location data
const weatherLocation = storage.getLocationData();
// init weather object
const weather = new weather(weatherLocation.city, weatherLocation.state);
// init UI
const ui = new UI();

// Get weather on DOM load
document.addEventListener('DOMContentLoaded, getWeather');

// Change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;

  // Change location
  weather.changeLocation(city, state);

  // Set location in LS
  storage.setLocationData(city, state);
  
  // Get and display weather
  getWeather();

  // Close modal
  $('#locModal').modal('hide');
});

function getWeather(){
  weather.getWeather()
    .then(results => {
      ui.paint(results);
    })
    .catch(err => console.log(err));
}
