const request = require('postman-request');

const geocode = (address, callback) => {
    // encodeURIComponent translates special characters into url components.
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGhhdHdpZ2h0Z3V5IiwiYSI6ImNrZGozNTczNzBiMGYyeXBlbGQ4dmRqZXUifQ.KshAvYaXetBnEtRAIOVneA&limit=1';

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!');
        } else if(body.features.length === 0){
            callback('No matching results. Try another search!');
        } else {
            const {center, place_name:location,} = body.features[0];

            callback(undefined, {
                latitude: center[1], 
                longitude: center[0], 
                location
            }); 
        }
    });
}

module.exports = geocode;