const geocode = require('./wheather-app/utils/geocode')
const forecast = require('./wheather-app/utils/forecast')

const address = process.argv[2]

if (!address) {
  console.log('Please enter an address')
}
else {
  geocode(address, (error, { latitude, langitude, location }) => {
    if (error) {
      return console.error('Geocode', error)
    }
    else {
      forecast(latitude, langitude, (err, forcastData) => {
        if (err) {
          return console.error('Forecast', err)
        }
        console.log(location)
        console.log(forcastData)
      })
    }
  })
}