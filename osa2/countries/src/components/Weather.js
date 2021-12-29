import React, { useState, useEffect } from "react";
import axios from "axios";


const Weather = ({country}) => {
    const [weather, setWeather] = useState([])
  
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.name
    }
    useEffect(() => {
    axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        const apiResponse = response.data;
        if (apiResponse.success === false){
            return
        }
        setWeather([apiResponse])
      }).catch(error => {
        console.log(error);
      })
    }, [])
      
    if (weather.length > 0){
      const currentWeather = weather[0].current
      return(
        <>
        <h2>Weather in {country.capital}</h2>
        <p> <b>Temperature: </b> {currentWeather.temperature} ℃</p>
        <img src={currentWeather.weather_icons[0]} alt="Weather icon"></img>
        <p>wind: {currentWeather.wind_speed} mph, direction {currentWeather.wind_dir}</p>
        </>
      )
    }
    return null
  }

export default Weather
