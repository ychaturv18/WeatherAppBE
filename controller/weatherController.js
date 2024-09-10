const axios = require('axios');
const NodeGeocoder = require('node-geocoder');
require('dotenv').config();

exports.index = async (req, res) => {
  const city = req.query.city;
  console.log(" city is  " + city);
  
  try {
    const coordinates = await getCoordinatesByCity(city);
    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;
    
   const weatherData = await fetchWeather(latitude, longitude);
  
    console.log("Hi Yash successfully got the data");
    res.status(200).json(weatherData); // Sending JSON response
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' }); // Sending error response
  }
};

async function fetchWeather(latitude, longitude) {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=6fd2166c3561f21f1d6657900ff386e6`);
    console.log("weather data : " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    throw new Error('Error fetching weather data');
  }
}

async function getCoordinatesByCity(cityName) {
  try {
    const options = {
      provider: process.env.PROVIDER,
      apiKey: process.env.GEO_LOC_API
    };
    const geocoder = NodeGeocoder(options);
    console.log("Getting coords");
    const res = await geocoder.geocode(cityName);
    
    if (res && res.length > 0) {
      const { latitude, longitude } = res[0];
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      return { latitude, longitude };
    } else {
      throw new Error('No results found for the city.');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw new Error('Error fetching coordinates');
  }
}
