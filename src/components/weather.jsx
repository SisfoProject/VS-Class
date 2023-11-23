import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import {motion} from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sun, Cloud, CloudRain, CloudSnow, CloudFog, CloudLightning, CloudSun,MapPinLine } from "@phosphor-icons/react";

function Weather() {
  const [weather, setWeather] = useState({});
  const [des, setDes] = useState('');


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoordinates(latitude, longitude);
      });
    }
  }, []);

  const fetchWeatherByCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=328a999c9199584ca8a1c676b673b9f3`);
      setWeather(response.data);
      setDes(response.data.weather[0].description);
    } catch (error) {
      console.log(error);
    }
  }



  const getWeatherComponent = () => {
    if (weather && weather.weather && weather.weather.length > 0) {
      switch (weather.weather[0].description) {
        case "clear sky":
          return (
            <>
              <Sun size={100} />
            </>
          );
        case "few clouds":
          return (
            <>
              <CloudSun size={100} />
        
            </>
          );
        case "scattered clouds":
          return (
            <>
              <Cloud size={100} />
           
            </>
          );
        case "broken clouds":
          return (
            <>
              <Cloud size={100} />
            </>
          );
        case "overcast clouds":
          return (
            < >
              <Cloud size={100} />
            
            </>
          );
        case "light rain":
          return (
            <>
             <CloudRain size={100} />
      
            </>
          );
        case "moderate rain":
          return (
            < >
             <CloudRain size={100} />
            </>
          );
        case "heavy intensity rain":
          return (
            <>
       
              <CloudRain size={100} />
            </>
          );
        case "thunderstorm":
          return (
            <>
     
              <CloudLightning size={100} />  
            </>
          );
        case "light snow":
          return (
            <>
         
              <CloudSnow size={100} />
            </>
          );
        case "snow":
          return (
            <>
         
              <CloudSnow size={100} />
            </>
          );
        case "mist":
          return (
            <>
              <CloudFog size={100} />
            </>
          );
        default:
          return (
            <>
             <Cloud size={100} />    
            </>
          );
      }
    } else {
      return null;
    }
  };

  return (
    <div>
      <div>
   
        <p className='flex items-center gap-2'>
          {getWeatherComponent()}
          <p className='font-extrabold text-xl'>
          {weather.name} <br/>
          {des}
          </p>
        </p>
      </div>
    </div>
  )
}

export default Weather