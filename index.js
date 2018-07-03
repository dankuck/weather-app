const app = require('express')();
const serve = require('./app/static-handler-builder.js');
const request = require('request');
const config = require('./config.json');
 
app.get('/', serve('./index.html'));
app.get('/app.js', serve('./app.js'));
app.get('/api/weather-search', function (req, res) {
    const location = req.query.location;
    if (!location) {
        res.status(400).json({error: "The `location` parameter is required."});
        return;
    }
    const api_key = config.openweathermap.api_key;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&mode=json&APPID=${api_key}`;
    request.get(url, function (error, response, body) {
        if (error) {
            res.status(error).json({error: body});
            return;
        }
        res.json(JSON.parse(body));
    });
});
 
const server = app.listen(3000)

module.exports = {server, app};
