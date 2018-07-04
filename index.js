const app = require('express')();
const serve = require('./app/static-handler-builder.js');
const OpenWeatherApiClient = require('./app/open-weather-api-client.js');
const config = require('./config.json');
 
app.get('/', serve('index.html', 'text/html'));
app.get('/app.js', serve('app.js', 'application/javascript'));
app.get('/app.css', serve('app.css', 'text/css'));
app.get('/api/weather-search', function (req, res) {
    const location = req.query.location;
    if (!location) {
        res.status(400).json({error: "The `location` parameter is required."});
        return;
    }
    const api_key = config && config.openweathermap && config.openweathermap.api_key;
    if (!api_key) {
        res.status(400).json({error: "No API key is setup in config.json."});
        return;
    }
    const client = new OpenWeatherApiClient(api_key);
    client.getForecastByCityName(`${location},us`)
        .then(
            response => res.json(response),
            error => res.status(500).json({error})
        );
});
 
const server = app.listen(3000)

module.exports = server;
