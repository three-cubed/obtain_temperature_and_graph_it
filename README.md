Please note this project is functional but is still being developed and is not in its final form.

#### Project Overview

The aim of this project is to consume another API's data, to process that data to obtain particular information, and to display the processed data in graphical form.

At the moment, the project obtains hourly data for the last five days of weather in London, calculates the daily temperature maxima and minima, and displays these as two lines on a graph. The original data come from *openweathermap.org*.

The project uses NodeJS, ChartJS, & the Fetch API.

#### Before using the application

Before first use:
1. Install NodeJS, if it is not already installed on your system.
2. Use the command `npm install` on the root directory.
3. Create a `.env` file in the root directory.
4. Get an API key by signing up to *openweathermap.org*. This is free and quickly done.
5. Enter your API key as `API_KEY=` into the `.env` file, for example: 
&emsp;API_KEY=a123456789b987654321c654321d0987

#### Using the application

Run `index.js` in the root directory. 
Then go to `http://localhost:3010`.
