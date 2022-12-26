import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const Weather = () => {
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState([]);
  const getWeatherApi = useMemo(() => {
    return async (latitude, longitude) => {
      try {
        let params = {
          lat: latitude,
          lon: longitude,
          appid: process.env.REACT_APP_WEATHER_API_KEY,
        };

        const url = process.env.REACT_APP_WEATHER_API_URL;
        const res = await axios.get(url, { params });
        if (res?.data && res.status === 200) {
          setWeather(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
  }, [location]);

  const getCurrentLocationData = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let { latitude, longitude } = position.coords;
        // let { longitude } = position.coords;
        setLocation({ latitude, longitude });
        latitude && longitude && getWeatherApi(latitude, longitude);
      });
    }
  };

  useEffect(() => {
    getCurrentLocationData();
  }, []);
  return (
    <div className="weather">{`It is currently ${weather?.main?.temp} degrees out with ${weather?.weather?.[0]?.description}`}</div>
  );
};

export default Weather;
