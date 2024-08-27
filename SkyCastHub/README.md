# SkyCastHub - Weather App

A simple weather application that fetches and displays current weather information for a specified city using the OpenWeatherMap API. It shows the city name, country, and local time in a user-friendly format.

## Features

- Fetch current weather information for any city.
- Display city name and country.
- Show the current date and time adjusted to the city's timezone.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox)
- An internet connection to fetch weather data

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/weather-app.git
   ```

   cd weather-app

### 4. **Configuration**

If your project requires configuration (e.g., API keys), explain how to set it up.

````markdown
### Configuration

1. **API Key**

   To use the OpenWeatherMap API, you need an API key. Replace `your_api_key_here` in the JavaScript code with your own API key.

   ```javascript
   const API_KEY = "your_api_key_here";
   ```
````

### 5. **Usage**

Provide basic usage instructions or examples of how to interact with your project.

```markdown
### Usage

1. Open the `index.html` file in a browser.
2. The application will display the weather information for the default city (`Bhubaneswar`) and update it with the current date and time.
```

### Code Explanation

- **`convertTimeStamp(timestamp, timezone)`**: Converts the Unix timestamp and timezone offset into a human-readable date and time format.
- **`convertCountryCode(country)`**: Converts the country code into a country name using `Intl.DisplayNames`.
- **`getWeather()`**: Fetches weather data from the OpenWeatherMap API and updates the HTML with the city name, country, and formatted date/time.
