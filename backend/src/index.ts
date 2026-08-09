import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT||3000;

app.get("/",(req, res)=>{
      res.json({
        message :"Server is running",
        success :true
      });
});

app.get("/weather", async (req,res)=>{

    const city = req.query.city;
   
    try{
       const response = await axios.get(
             `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`
       )
        res.json(response.data);
    }catch(error){
        res.status(404).json({
           message: "City not found"
        })
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
