/* eslint-disable react/prop-types */
//import dotenv from 'dotenv';
import axios from 'axios';
import { useState, useEffect } from 'react';

//dotenv.config()

const Icon = ({ url, description }) => {
    if (url !== null) {
        return (
            <div>
                <img src={url} alt={description}></img>
            </div>
        )
    }
    return null;
}

const Wind = ({ windSpeed }) => {
    if (windSpeed !== null) {
        return (
            <div>Wind {windSpeed} m/s</div>
        )
    }
    return null;
}

const Temperature = ({ localWeather, fahrenheitToCelsius }) => {
    if (localWeather !== null) {
        return <p>Temperature: {fahrenheitToCelsius(localWeather.main.temp)} Celcius</p>
    }
    else {
        return null;
    }
}

const Weather = ({ country }) => {
    const [iconUrl, setIconUrl] = useState(null)
    const [localWeather, setLocalWeather] = useState(null)
    const [windSpeed, setWindSpeed] = useState(null)


    const iconBaseURL = import.meta.env.VITE_ICON_URL;
    const fahrenheitToCelsius = fahrenheit => ((fahrenheit - 32) * (5 / 9)).toFixed(2);

    const fetchLocalWeather = () => {
        const baseURL = import.meta.env.VITE_OPEN_WEATHER_URL;
        const appId = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
        const query = new URLSearchParams(
            {
                q: country.capital[0],
                limit: '1',
                appid: appId
            }
        ).toString();

        axios.get(`${baseURL}?${query}`)
            .then(respose => {
                return respose.data
            })
            .then(results => {
                console.log('results', results)
                setLocalWeather(results)
                setIconUrl(`${iconBaseURL}/${results.weather[0].icon}.png`)
                setWindSpeed(results.wind.speed)
            })
            .catch(reason => {
                console.log(reason);
            });
    }

    useEffect(fetchLocalWeather, [country]);

    if (localWeather !== null) {
        return (
            <div>
                <h1>Weather in {country.capital[0]}</h1>
                <Temperature localWeather={localWeather} fahrenheitToCelsius={fahrenheitToCelsius} />
                <Icon url={iconUrl} description={localWeather.weather[0].description} />
                <Wind windSpeed={windSpeed} />
            </div>
        )
    }
    return null;

}

export default Weather;