const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { request } = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App', 
        name: 'Travis Wight'
    });
}); 

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me', 
        name: 'Travis Wight'
    });
}); 

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me!', 
        message: 'This is a help message!',
        name: 'Travis Wight'
    });
}); 

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404', 
        message: 'Help article not found', 
        name: 'Travis Wight'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error){
                return res.send({
                    error
                });
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error
                    });
                }
                
                res.send({
                    forcast: forecastData, 
                    location,
                    address: req.query.address
                }); 
            });
        });
    }    
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You Must Provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404', 
        message: 'Page Not Found', 
        name: 'Travis Wight'
    });
});

let server = app.listen(port, () => {
    console.log('Server is up on port', server.address().port);
});
