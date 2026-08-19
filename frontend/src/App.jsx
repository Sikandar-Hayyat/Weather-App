import { useState,useEffect } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import HistoryTable from "./components/historyTable";
import HistoryControls from "./components/historyControls";
import SearchBox from "./components/searchBox";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  
  useEffect(() => {
  const socket = new WebSocket("ws://localhost:3000/ws");

  socket.onopen = () => {
    console.log("WebSocket connected");

    socket.send("Hello Backend!");
  };

socket.onmessage = (event) => {
  console.log("Raw message:", event.data);

  const data = JSON.parse(event.data);

  console.log("Parsed data:", data);

  if (data.type === "weather") {
    setWeather(data);
  }
};

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  return () => {
    socket.close();
  };
}, []);

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);
    setHistory([]);

    try {
      const response = await axios.get(
        `http://localhost:3000/weather?city=${city}`
      );

      setWeather(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setError("City not found. Please enter a valid city.");
      } else {
        setError("Something went wrong. Please try again.");
      }

      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getHistory = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    if (!fromDate || !toDate) {
      setError("Please select both dates");
      return;
    }

    if (fromDate > toDate) {
      setError("From date cannot be later than To date");
      return;
    }

    setHistoryLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:3000/history?city=${city}&from=${fromDate}&to=${toDate}`
      );

      setHistory(response.data);
    } catch (error) {
      setError("Failed to fetch weather history");
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Weather App</h1>

      <SearchBox
        city={city}
        setCity={setCity}
        getWeather={getWeather}
        loading={loading}
      />

      <HistoryControls
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        getHistory={getHistory}
        historyLoading={historyLoading}
      />

      {loading && (
        <p className="loading">
          Loading weather...
        </p>
      )}

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {weather && (
        <WeatherCard weather={weather} />
      )}

      {history.length > 0 ? (
        <HistoryTable history={history} />
      ) : (
        fromDate &&
        toDate &&
        !historyLoading && (
          <div className="history-results">
            <h2>Historical Weather</h2>

            <p className="no-history">
              No weather records found for this date range.
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default App;