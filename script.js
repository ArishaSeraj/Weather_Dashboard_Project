const container = document.querySelector('.Weather-Container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
  const APIKey = '630bbf676c9ef6b3ad8d3ed08b79c26d';
  const city = document.querySelector('.search-box input').value;

  if (city === '') return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod === '404') {
        container.style.height = '400px'; // Adjust container height for error message
        weatherBox.classList.remove('active'); // Hide weather box
        error404.classList.add('active'); // Show "not-found" section
        return;
      }

      // Display weather data
      container.style.height = '555px';
      weatherBox.classList.add('active'); // Show weather box
      error404.classList.remove('active'); // Hide "not-found" section

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'images/sunny weather.png';
          break;
        case 'Rain':
          image.src = 'images/Rainy.png';
          break;
        case 'Snow':
          image.src = 'images/Snow.png';
          break;
        case 'Mist':
          image.src = 'images/Mist.png';
          break;
        case 'Fog':
          image.src = 'images/Fog.png';
          break;
        case 'Smoke':
          image.src = 'images/Smoke.png';
          break;
        case 'Thunderstorm':
          image.src = 'images/Thunderstorm.png';
          break;
        default:
          image.src = 'images/cloudy weather.png';
      }

      temperature.innerHTML = `${json.main.temp.toFixed(1)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;

      // Display city-specific time
      const timezoneOffset = json.timezone; // Timezone offset in seconds
      displayTimeForCity(timezoneOffset);
    })
    .catch(err => {
      console.error('Error fetching weather data:', err);
    });
});

// Function to display the current time for the entered city
function displayTimeForCity(timezoneOffset) {
  setInterval(() => {
    const localTime = new Date(); // Current local time
    const utcTime = localTime.getTime() + localTime.getTimezoneOffset() * 60000; // UTC time in milliseconds
    const cityTime = new Date(utcTime + timezoneOffset * 1000); // City time in milliseconds

    const options = { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    };
    const time = cityTime.toLocaleTimeString([], options);
    document.getElementById('time').textContent = `Current Time: ${time}`;
  }, 1000);
}