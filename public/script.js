const fetchWeather = async () => {
    const response = await fetch('/weather').then(function(response) {
        response.text().then(function(text) {
            parsed = JSON.parse(text);
            for (i = 0; i < parsed.length; i++) {
                let temperatureArray = [];
                parsed[i].hourly.forEach(hour => {
                    document.getElementById('notes').innerHTML = 'Up-to-date data obtained from <i>api.openweathermap.org</i> and processed for display. <br>Data are for 51°30\' N, 0° W (North Greenwich). <br>Twenty-four-hour periods are measured back from the moment of loading the page, so, for example, "current" indicates the 24 hours preceeding loading.';
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

let dayMaxima = [];
let dayMinima = [];
fetchWeather()

function makeChart() {
    let graph = document.getElementById('graph').getContext('2d');
    Chart.defaults.defaultFontFamily = 'Lato';
    Chart.defaults.defaultFontSize = 25;
    let maxiMiniChart = new Chart(graph, {
        type:'line',
        data:{
            labels:['5 days ago', '4 days ago', '3 days ago', '2 days ago', 'yesterday', 'current'],
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
