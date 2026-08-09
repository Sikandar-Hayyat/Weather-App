import {useState} from "react";
import './App.css'
import WeatherCard from "./components/WeatherCard";
import axios from "axios";

function App(){
  const[city, setCity]=useState("");
  const[weather, setWeather]=useState(null);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState("");

  const getWeather= async () =>{

    if(!city.trim()){
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try{
      const response = await axios.get(
        `http://localhost:3000/weather?city=${city}`
      )
  
      console.log("API Response:", response.data);
      setWeather (response.data);
    }
    catch(error){
      console.log(error);

      if(error.response?.status === 404){
      setError("City not found. Please enter a valid city.");
      }
      else{
      setError("Something went wrong. Please try again.");
      }
      
      setWeather(null);
    }
    finally{
      setLoading(false);
    }
  };

 return (
  <div className = "app">
    <h1 className = "title">Weather App</h1>

    <div className ="search-box">
      <div className = "search-controls">
       <input
       type ="text"
       placeholder = "Enter City..."
       value ={city}
       onChange = {(event) =>setCity (event.target.value)}
       onKeyDown={(event) => {
          if(event.key === "Enter"){
            event.preventDefault();
            getWeather();
          }
        }
       }
       />
      
       <button onClick = {getWeather} disabled={loading}>  
        { loading ? "Searching" : "Search" }
       </button>
      </div>
      
      
      {loading && <p className="loading">Loading weather...</p>}
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather = {weather} />}
    
    </div>
  </div>
 )
}
export default App