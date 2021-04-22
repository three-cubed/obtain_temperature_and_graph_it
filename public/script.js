const fetchWeather = async () => {
    const response = await fetch('/weather').then(function(response) {
      response.text().then(function(text) {
          parsed = JSON.parse(text);
          for (i=0; i < parsed.length; i++) {
              temperatureArray = [];
              parsed[i].hourly.forEach(hour => {
                  document.getElementById('heading').innerHTML = 'Up-to-date data obtained from <i>api.openweathermap.org</i> and processed for display. <br>Data are for 51°30\' N, 0° W (North Greenwich). <br>Twenty-four-hour periods are measured back from the moment of loading.';
                  temperatureArray.push(hour.temp);
              });
              let dayMax = Math.max(...temperatureArray);
              let dayMin = Math.min(...temperatureArray);
              dayMaxima.push(dayMax);
              dayMinima.push(dayMin);
          }
      }).then(function() {
            makeChart()
      })
    });
}

let dayMaxima=[];
let dayMinima=[];
fetchWeather()

function makeChart() {
        let myChart = document.getElementById('myChart').getContext('2d');
        Chart.defaults.defaultFontFamily = 'Lato';
        Chart.defaults.defaultFontSize = 25;
        let maxiMiniChart = new Chart(myChart, {
            type:'line',
            data:{
                labels:['5 days ago', '4 days ago', '3 days ago', '2 days ago', 'yesterday'],
                datasets:[
                    {
                        label: '24-hour maximum temperature in ° C',
                        data: dayMaxima,
                        borderWidth: 3,
                        borderColor:'red'
                    },
                    {
                      label: '24-hour minimum temperature in ° C',
                        data: dayMinima,
                        borderWidth: 3,
                        borderColor:'blue'
                    }
                ]
            },
            options:{
                title:{
                    display:true,
                    text:'Maximum and minimum temperatures for the last five days',
                    fontSize:25
                }
            }
        });
}
