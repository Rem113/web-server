const https = require('https')

const TOKEN = process.env.LOCATIONIQ_TOKEN
let url = 'https://eu1.locationiq.com/v1/'

function getFromLatLon(lat, lon) {
    url += `reverse.php?key=${TOKEN}&lat=${lat}&lon=${lon}&format=json`
    console.log(url)

    https.get(url, (response) => {
        console.log(response.statusCode)

        response.on("data", (data) => {
            var obj = JSON.parse(data)
            return obj['display_name']
        })
    })
}

function getFromAddress(address) {
    url += `search.php?key=${TOKEN}&q=${address}&format=json`
    console.log(url)

    https.get(url, (response) => {
        console.log(response.statusCode)
        response.setEncoding('utf8')

        response.on("data", (data) => {

            //console.log(data)
            //var obj = JSON.stringify(data)
            console.log(JSON.parse(data.toString()))
        })
    })
}

module.exports = { getFromLatLon, getFromAddress }