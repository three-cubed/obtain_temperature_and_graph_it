const express = require('express');
const fetch = require('node-fetch');
const Statistics = require('statistics.js');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './.env' })
}

const app = express();
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.get('/data', async (request, response) => {
    APIresponseArray = [];
    let newDate = Math.floor(Date.now() / 1000);
    let backDates = [];
    let periodsOnGraph = 6;
    for (i = 0; i < periodsOnGraph; i++) {
        backDates.unshift(newDate - (i * 24 * 60 * 60));
    }
    for (i = 0; i < periodsOnGraph; i++) {
        const api_url = `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=51.5&lon=0&dt=${backDates[i]}&appid=${process.env.API_KEY}&units=metric`;
        const fetch_response = await fetch(api_url);
        const jsonWeather = await fetch_response.json();
        APIresponseArray.push(jsonWeather);  
    }
    extractDataAndCalculateStatistics(APIresponseArray);
    response.json([correlationCoefficient1dp, standardDeviationOfMaxima, standardDeviationOfMinima, dayMaxima, dayMinima]);
});

let correlationCoefficient1dp, standardDeviationOfMaxima, standardDeviationOfMinima;
let dayMaxima = [];
let dayMinima = [];

const extractDataAndCalculateStatistics = async (APIresponseArray) => {
    let dailyTempExtremes = [];
    dayMaxima = [];
    dayMinima = [];
    for (i = 0; i < APIresponseArray.length; i++) {
        let temperatureArray = [];
        APIresponseArray[i].hourly.forEach(hour => {
            temperatureArray.push(hour.temp);
        });
        let dayMax = Math.max(...temperatureArray);
        let dayMin = Math.min(...temperatureArray);
        let dayTempExtremes = {};
        dayTempExtremes.miniTemp = dayMin;
        dayTempExtremes.maxiTemp = dayMax;
        dailyTempExtremes.push(dayTempExtremes);
        dayMaxima.push(dayMax);
        dayMinima.push(dayMin);
    }
    var variablesTemperatureMaxAndMin = {
        miniTemp: 'metric',
        maxiTemp: 'metric'
    };

    let stats = new Statistics(dailyTempExtremes, variablesTemperatureMaxAndMin);
    correlationCoefficient1dp = stats.correlationCoefficient('miniTemp', 'maxiTemp').correlationCoefficient.toFixed(1);

    standardDeviationOfMaxima = stats.standardDeviation(dayMaxima).toFixed(2);
    standardDeviationOfMinima = stats.standardDeviation(dayMinima).toFixed(2);
}

app.listen(process.env.PORT || 3010, () => console.log('Starting server: http://localhost:3010'));
