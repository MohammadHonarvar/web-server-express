const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'MHF'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'MHF'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help me',
    name: 'MHF'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must enter an address.'
    })
  }

  geocode(req.query.address, (error, { latitude, langitude, location } = {}) => {
    if (error) {
      console.log(error)
      return res.send({ error }) 
    }

    forecast(latitude, langitude, (err, forecastData) => {
      if (err) {
        return res.send({
          error: err
        }) 
      }

      return res.send({
        location: location,
        forecast: forecastData
      })
    })
  })

})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'MHF',
    errorMessage: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'MHF',
    errorMessage: 'This page not found.'
  })
})

app.listen(3000, () => {
  console.log('App is running and listen on port 3000...')
})