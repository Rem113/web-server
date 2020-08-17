const haversine = require('haversine')

function distanceBetween(latStart, lonStart, latEnd, lonEnd) {

    const start = {
        latitude: latStart,
        longitude: lonStart
    }

    const end = {
        latitude: latEnd,
        longitude: lonEnd
    }

    return haversine(start, end, { unit: 'km' });
}

module.exports = distanceBetween