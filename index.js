const express = require('express');
const fetch = require('node-fetch');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: './.env' })
}

const app = express();
app.listen(3010, () => console.log('Starting server: http://localhost:3010'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.get('/weather', async (request, response) => {;
    let newDate = Math.floor(Date.now() / 1000);
    backDates = [];
    for (i = 0; i < 5; i++) {
        backDates.push(newDate - (i * 24 * 60 * 60));
    }
    responseArray = [];
    for (i = 0; i < 5; i++) {
        const api_url = `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=51.5&lon=0&dt=${backDates[i]}&appid=${process.env.API_KEY}&units=metric`;
        const fetch_response = await fetch(api_url);
        const jsonWeather = await fetch_response.json();
        responseArray.push(jsonWeather);  
    }
    response.json(responseArray);
})
