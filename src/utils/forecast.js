const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f067f184bdf13301bac6902be8371530&query=' + latitude + ',' + longitude + '&units=f';

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!');
        } else if(body.error){
            callback('Unable to find location! Please try another search!');
        } else{
            const {weather_descriptions, temperature, feelslike} = body.current;

            callback(undefined, weather_descriptions[0] + '. It is currently ' + temperature + ' degress out. It feels like ' + feelslike + ' degrees.');
        }
    }); 
}

module.exports = forecast;