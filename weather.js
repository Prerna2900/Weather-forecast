// Set up API key and URL
	
const apiKey = "8a9ff60c3d394e8ebe782946241111";

const apiUrl = "http://api.weatherapi.com/v1/current.json?key=8a9ff60c3d394e8ebe782946241111&q=india&aqi=no";

// Get DOM elements
const locationInput = document.querySelector('.text input[type="text"]');
const resetButton = document.querySelector('.text input[type="button"]');
const container = document.querySelector(".container");

// Function to fetch weather data
async function fetchWeather(location) {
  try {
    const response = await fetch(
  `${apiUrl}&q=${location}&units=metric`
);

  
    const data = await response.json();

    if (data.cod === 200) {
      displayWeather(data);
    } else {
      container.innerHTML = `<p class="text-danger">Location not found. Please try again.</p>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    container.innerHTML = `<p class="text-danger">Error fetching data. Please try again later.</p>`;
  }
}

// Function to display weather data
function displayWeather(data) {
  const { name, sys, main, weather, wind } = data;
  container.innerHTML = `
    <h1>Weather in ${name}, ${sys.country}</h1>
    <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather Icon" style="height: 100px; width: 100px;">
    <p><strong>Temperature:</strong> ${main.temp} °C</p>
    <p><strong>Weather:</strong> ${weather[0].description}</p>
    <p><strong>Humidity:</strong> ${main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
  `;
}

// Event listener for fetching weather on "Enter" key
locationInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchWeather(locationInput.value);
  }
});

// Event listener for "Reset" button
resetButton.addEventListener("click", () => {
  locationInput.value = "";
  container.innerHTML =
    '<h1>Weather</h1><img src="https://cdn-icons-png.flaticon.com/512/10127/10127236.png" style="height: 250px; width: 250px;">';
});
