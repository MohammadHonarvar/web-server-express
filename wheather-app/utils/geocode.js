const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWhmMjAxMyIsImEiOiJjandrZXVicmIwdWx6NDlwNzR6Njhvb3h2In0.6us1Kqi6EUBtuNu52SmpSg`
  
    request({url, json: true}, (error, { body }) => {
      if (error) {
        callback('Unable to connect to location service!', undefined)
      }
      else if (!body.features.length) {
        callback('Unable to find location, try another search.', undefined)
      }
      else {
        //   const [] = body.features[0]
        callback(undefined, {
          latitude: body.features[0].center[0],
          langitude: body.features[0].center[1],
          location: body.features[0].place_name
        })
      }
    })
  }

  module.exports = geocode