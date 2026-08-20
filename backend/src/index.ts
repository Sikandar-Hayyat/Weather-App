import dns from "dns";
import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import connectDB from "./config/db";
import Weather from "./models/weather";
import City from "./models/city";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import "./jobs/weatherJob";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/",(req, res)=>{
      res.json({
        message :"Server is running",
        success :true
      });
});

app.get("/weather", async (req,res)=>{

    const city = req.query.city as string;

     if (!city || !city.trim()) {
    return res.status(400).json({
        message: "City name is required"
    });
    }
   
    try{
       const response = await axios.get(
             `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`
       )
      const weatherData = response.data;

       await City.findOneAndUpdate(
       { name: weatherData.name },
       { name: weatherData.name },
       { upsert: true, new: true }
       );

    await Weather.create({
    city: weatherData.name,
    temperature: weatherData.main.temp,
    humidity: weatherData.main.humidity,
    description: weatherData.weather[0].description,
    date: new Date()
    });
        res.json(response.data);
    }catch(error){
        res.status(404).json({
           message: "City not found"
        })
    }
});

app.get("/history", async (req, res) => {
  const city = req.query.city as string;
  const from = req.query.from as string;
  const to = req.query.to as string;

  if (!city || !from || !to) {
    return res.status(400).json({
      message: "City, from date, and to date are required"
    });
  }

  try {
  const startDate = new Date(from);
  const endDate = new Date(to);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return res.status(400).json({
      message: "Invalid date format"
    });
  }

  if (startDate > endDate) {
    return res.status(400).json({
      message: "From date cannot be later than To date"
    });
  }

  endDate.setHours(23, 59, 59, 999);

    const history = await Weather.aggregate([
      {
        $match: {
          city: { $regex: new RegExp(`^${city}$`, "i") },
          date: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },

      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" },
            hour: { $hour: "$date" }
          },

          averageTemperature: {
            $avg: "$temperature"
          },

          averageHumidity: {
            $avg: "$humidity"
          },

          description: {
            $first: "$description"
          },

          date: {
            $first: "$date"
          }
        }
      },

      {
        $sort: {
          date: -1
        }
      }
    ]);

    res.json(history);

  } catch (error) {
    console.error("History error:", error);

    res.status(500).json({
      message: "Failed to fetch weather history"
    });
  }
});

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
