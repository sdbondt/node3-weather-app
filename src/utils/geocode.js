const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia29mZmlla2FuIiwiYSI6ImNrb2hmMjF4MjE1OTAybnFwNjY0M2lteXUifQ.2gNmdtr4P-QECMfhvbv9BA&limit=1`;
    request({url, json: true }, (err, {body} = {}) => {
        if(err) {
            callback('Unable to connect')
        } else if( body.features.length === 0 ) {
            callback('Unable to find location');
        } else {
            callback(undefined, {
                latitutde: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
};

module.exports = geocode;