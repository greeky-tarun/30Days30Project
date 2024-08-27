let units = "metric";

let city = document.querySelector(".weather-city");
let datetime = document.querySelector(".weather-date-time");
let weather_forecast = document.querySelector(".weather-forecast");
let weather_temperature = document.querySelector(".weather-temperature");
let weather_icon = document.querySelector(".weather-icon");
let weather_minmax = document.querySelector(".weather-minmax");
let weather_realfeel = document.querySelector(".weather-realfeel");
let weather_humidity = document.querySelector(".weather-humidity");
let weather_wind = document.querySelector(".weather-wind");
let weather_pressure = document.querySelector(".weather-pressure");

document.querySelector(".weather-search").addEventListener('submit', e => {
    let search = document.querySelector(".weather-search-form");
    e.preventDefault();
    getWeatherByCity(search.value);
    search.value = "";
});

document.querySelector(".weather-units-celsius").addEventListener('click', () => {
    if (units !== "metric") {
        units = "metric";
        getWeather();
    }
});

document.querySelector(".weather-units-farenheit").addEventListener('click', () => {
    if (units !== "imperial") {
        units = "imperial";
        getWeather();
    }
});

function convertTimeStamp(timestamp, timezone) {
    const date = new Date((timestamp + timezone) * 1000);
    
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: "UTC",
        hour12: true,
    };
    return date.toLocaleString("en-US", options);
}

function convertCountryCode(country) {
    let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(country);
}

function getWeatherByCity(cityName) {
    const API_KEY = 'd3b93bc545040439bbbc937a491c3db2';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${units}`)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                alert("Error: " + data.message);
                return;
            }

            city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
            datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
            weather_forecast.innerHTML = `<p>${data.weather[0].main}</p>`;
            weather_temperature.innerHTML = `${data.main.temp.toFixed()}&#176`;
            weather_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`;
            weather_minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;
            weather_realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
            weather_humidity.innerHTML = `${data.main.humidity}%`;
            weather_wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph" : "m/s"}`;
            weather_pressure.innerHTML = `${data.main.pressure} hPa`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert("Failed to retrieve weather data. Please try again.");
        });
}

function getWeatherByCoordinates(lat, lon) {
    const API_KEY = 'd3b93bc545040439bbbc937a491c3db2';

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                alert("Error: " + data.message);
                return;
            }

            city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
            datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
            weather_forecast.innerHTML = `<p>${data.weather[0].main}</p>`;
            weather_temperature.innerHTML = `${data.main.temp.toFixed()}&#176`;
            weather_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`;
            weather_minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;
            weather_realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
            weather_humidity.innerHTML = `${data.main.humidity}%`;
            weather_wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph" : "m/s"}`;
            weather_pressure.innerHTML = `${data.main.pressure} hPa`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert("Failed to retrieve weather data. Please try again.");
        });
}

function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoordinates(lat, lon);
        }, () => {
            alert("Unable to retrieve your location. Please enter a city name.");
            getWeatherByCity("London"); // Fallback to a default city
        });
    } else {
        alert("Geolocation is not supported by this browser.");
        getWeatherByCity("London"); // Fallback to a default city
    }
}

window.addEventListener('load', getWeather);
