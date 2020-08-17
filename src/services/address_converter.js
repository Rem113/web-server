const http = require('http')

const TOKEN = process.env.BING_MAPS_TOKEN
let url = 'http://dev.virtualearth.net/REST/v1/Locations'

function getFromLatLon(lat, lon) {
    url += `/${lat},${lon}?key=${TOKEN}`

    http.get(url, (response) => {
        response.on("data", (data) => {
            const obj = JSON.parse(data)
            console.log(obj.resourceSets[0].resources[0].address.formattedAddress)
        })
    })
}

function getFromAddress(address) {
    url += `?key=${TOKEN}&query=${address}`
    http.get(url, (response) => {
        response.on("data", (data) => {
            const obj = JSON.parse(data)

            // console.log(obj.resourceSets[0].resources[0].geocodePoints[0].coordinates)
            // console.log(obj.resourceSets[0].resources[0].address.formattedAddress)

            return ({
                "coordinates": obj.resourceSets[0].resources[0].geocodePoints[0].coordinates,
                "address": obj.resourceSets[0].resources[0].address.formattedAddress
            })
        })
    })
}

module.exports = { getFromLatLon, getFromAddress }