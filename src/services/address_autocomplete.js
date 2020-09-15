const axios = require("axios")

const TOKEN = process.env.BING_MAPS_TOKEN
let url = "http://dev.virtualearth.net/REST/v1/Autosuggest?"

async function getAutocomplete(lat, lon, query) {
    

    const q = url + `query=${query}&user_location=${lat},${lon},${50000}&includeEntityTypes=Address,Place&?key=${TOKEN}`

    const u =  'http://dev.virtualearth.net/REST/v1/Autosuggest?query=Rue de la marne&user_location=48.969135,2.304851,50000&includeEntityTypes=Address,Place&key=AvTzJZt1E6MHYLyNIogfiPuVFKl5THAE_BCqdscIzXMx_GSDwpOdYUPjBY4vw241'
    
    console.log(q)
    console.log(u)

    await axios
    .get(q)
    .then((res) => {
        let obj = res["data"]

        console.log(obj)
    })
}

module.exports = {getAutocomplete}