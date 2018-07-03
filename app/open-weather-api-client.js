const Request = require('request');

class OpenWeatherApiClient {

    constructor(api_key) {
        this.api_key = api_key;
    }

    getForecastByCityName(location) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&mode=json&APPID=${this.api_key}`;
        return new Promise((resolve, reject) => {
            Request.get(url, function (error, response, body) {
                const data = JSON.parse(body);
                if (data.cod >= 400) {
                    reject(data.message);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

module.exports = OpenWeatherApiClient;
