import cron from "node-cron";
import axios from "axios";
import Weather from "../models/weather";
import City from "../models/city";

const trackWeather = async () => {
    try {
        const cities = await City.find();

        for (const city of cities) {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${process.env.API_KEY}&units=metric`
                );

                const weatherData = response.data;

                await Weather.create({
                    city: weatherData.name,
                    temperature: weatherData.main.temp,
                    humidity: weatherData.main.humidity,
                    description: weatherData.weather[0].description,
                    date: new Date()
                });

                console.log(`Weather saved for ${city.name}`);
            } catch (error) {
                console.error(`Failed to fetch weather for ${city.name}`);
            }
        }
    } catch (error) {
        console.error("Weather job failed", error);
    }
};

cron.schedule("0 * * * *", async () => {
    console.log("Running weather job...");
    await trackWeather();
});