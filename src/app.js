const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')

const app = express();

//set up handlebars
app.set('view engine', 'hbs');
app.set('views', __dirname + '/../templates/views');
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'S',
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Is this helpful?',
        title: 'Help Page',
        name: 'S'
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found.',
        name: 'S',
        title: '404'
    })
})

app.get('/about', (req, res) => {
   res.render('about', {
       title: 'About Me',
       name: 'S'
   })
});

app.get('/weather', ({query: { address }}, res) => {
    if(!address) {
        console.log('No address passed');
        res.send({error: 'An address must be supplied'})
    }
    else {
        geocode(address, (err, { longitude, latitude, location} = {}) => {
            if(err) {
                res.send({error: err})
            } else {
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        res.send({error})
                    } else {
                        res.json({
                            location,
                            forecastData,
                            address, 
                        })
                    }
                })
            }
        })
    }
});

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: '404',
        name: 'S'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})