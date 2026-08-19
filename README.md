# Weather App

A full-stack weather application built with React, Node.js, Express, and TypeScript. The application uses the OpenWeather API to fetch and display current weather information for different cities and stores weather data for historical tracking.

## Features

### Current Weather

* Search weather by city name
* Display temperature and feels-like temperature
* Display weather condition and description
* Display humidity and wind speed
* Display weather icons
* Search using the Enter key
* Loading state while fetching weather
* Invalid city error handling
* Empty input validation
* Responsive user interface

### Weather History & Tracking

* Save searched cities in MongoDB
* Store weather data including temperature, humidity, condition, and date
* Automatically collect weather data for saved cities every hour
* View historical weather by city
* Select a From and To date for historical records
* Display historical weather records in an hourly table
* Calculate average temperature and humidity for each hour
* Validate required city and date fields
* Validate date format
* Prevent selecting an invalid date range
* Display a message when no weather records are found

## Technologies Used

### Frontend

* React
* JavaScript
* Axios
* CSS

### Backend

* Node.js
* Express
* TypeScript
* Axios
* Node-Cron

### Database

* MongoDB
* Mongoose

### API

* OpenWeather API

## Project Structure

```text
Weather-App/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── jobs/
│   │   ├── models/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherCard.jsx
│   │   │   ├── HistoryTable.jsx
│   │   │   ├── HistoryControls.jsx
│   │   │   └── SearchBox.jsx
│   │   ├── App.jsx
│   │   └── App.css
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md
```

## Task Progress

### Task 1 — Current Weather

Completed:

* Current weather search
* Weather display
* OpenWeather API integration
* Error handling
* Responsive UI

### Task 2 — Weather History & Automatic Tracking

Completed:

* MongoDB integration
* City tracking
* Weather data storage
* Automatic hourly weather tracking
* Historical weather API
* Hourly historical data aggregation
* Historical weather table
* Date validation
* Frontend component organization

### Task 3 — WebSocket Integration

Completed:

* WebSocket connection between React frontend and Node.js backend
* WebSocket connection lifecycle handling using `onopen`, `onmessage`, `onerror`, and `onclose`
* Two-way communication between frontend and backend
* JSON-formatted WebSocket messages
* Integration of real OpenWeather API data with WebSocket communication
* Sending retrieved weather data from the Node.js backend to connected React clients

### WebSocket Communication Flow

```text
React Frontend
      ↓
HTTP Weather Request
      ↓
Node.js Backend
      ↓
OpenWeather API
      ↓
Node.js Backend
      ↓
WebSocket
      ↓
React Frontend
      ↓
WeatherCard


## Security

Sensitive environment variables such as API keys and database credentials are stored in a `.env` file and are excluded from GitHub using `.gitignore`.
