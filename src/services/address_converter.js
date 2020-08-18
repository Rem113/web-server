const http = require('http')
const axios = require('axios')

const TOKEN = process.env.BING_MAPS_TOKEN
let url = 'http://dev.virtualearth.net/REST/v1/Locations'

async function getFromLatLon(lat, lon) {
    url += `/${lat},${lon}?key=${TOKEN}`

    return await getResult(url)
}

async function getFromAddress(address) {
    url += `?key=${TOKEN}&query=${address}`

    return await getResult(url)
}

async function getResult(url) {
    var result = {}

    console.log(url)
    await axios.get(url).then(res => {
        var obj = res['data']

        // console.log(obj.resourceSets[0].resources[0])
        try {
            result = {
                "coordinates": obj.resourceSets[0].resources[0].geocodePoints[0].coordinates,
                "address": obj.resourceSets[0].resources[0].address.formattedAddress
            }
        } catch (error) {
            console.error(error)
            result = {
                "coordinates": [0, 0],
                "address": "ERROR"
            }
        }
    })

    return result
}

module.exports = { getFromLatLon, getFromAddress }