const request = require('request')

const forecast = (latitude, langitude, callback) => {
    const url = `https://api.darksky.net/forecast/e39e100b907684a921f6090e6cc7e3f8/${latitude}, ${langitude}?units=si`
  
    request({url, json: true}, (error, { body }) => {
      if (error) {
        callback('Unable to conect to weather service!', undefined)
      }
      else if (body.error) {
        callback('Unable to find any forcast', undefined)
      }
      else {
        callback(undefined, body.currently.temperature)
      }
    })
  }

  module.exports = forecast