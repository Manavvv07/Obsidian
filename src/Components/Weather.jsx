import { useState, useEffect, useRef } from "react";
import { Cloud, Sun, Wind, Droplets, Loader, MapPin } from "lucide-react";
import { animate } from "animejs";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardRef = useRef(null);

  const getWeatherInfo = (code) => {
    if (code === 0) return { text: "Clear Sky", icon: <Sun size={48} color="#facc15" /> };
    if (code >= 1 && code <= 3) return { text: "Partly Cloudy", icon: <Cloud size={48} color="#9ca3af" /> };
    if (code >= 45 && code <= 48) return { text: "Foggy", icon: <Cloud size={48} color="#6b7280" /> };
    if (code >= 51 && code <= 67) return { text: "Rain", icon: <Droplets size={48} color="#60a5fa" /> };
    if (code >= 71) return { text: "Snow", icon: <Cloud size={48} color="white" /> };
    return { text: "Unknown", icon: <Sun size={48} color="#facc15" /> };
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          );
          
          const locationRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );

          if (!weatherRes.ok) throw new Error("Weather fetch failed");
          
          const weatherData = await weatherRes.json();
          const locationData = await locationRes.json();

          const { temperature, windspeed, weathercode } = weatherData.current_weather;
          const info = getWeatherInfo(weathercode);
          const cityName = locationData.city || locationData.locality || "Unknown Sector";

          setWeather({
            temp: Math.round(temperature),
            condition: info.text,
            wind: windspeed,
            location: cityName,
            icon: info.icon
          });
        } catch (err) {
          console.error(err);
          setError("Data link failed");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("Location denied");
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (!loading && cardRef.current) {
      animate(cardRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        ease: "outExpo"
      });
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="state-message">
        <Loader className="loader-spin" size={24} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-message">
        <span className="error-text">{error}</span>
      </div>
    );
  }

  return (
    <div ref={cardRef} className="weather-container">
        <div className="detail-row">
          
          <span className="location" style={{ textAlign: "right", maxWidth: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {weather.location}
          </span>
        </div>
        <div className="weather-header">
        <div>
          <h2 className="weather-temp">{weather.temp}°C</h2>
          <p className="weather-condition">{weather.condition}</p>
        </div>
        
      </div>

      <div className="weather-details">
        <div className="detail-row bordered">
          <span className="detail-label">
            <Wind size={16} /> Wind
          </span>
          <span className="detail-value">{weather.wind} km/h</span>
        </div>
        
      </div>
    </div>
  );
};

export default Weather;