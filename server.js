'use strict';

//  In this step i load the Environment Variables from the .env file
require('dotenv').config();

// Dependencies
const express = require('express');
const cors = require('cors');
// const superagent = require('superagent');
const pg = require('pg');
//  Setup My Application
const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());

const client = new pg.Client(process.env.DATABASE_URL);
// client.on('error', err =>{
//   throw new Error (err);
// });
const checkLocation = require('./location.js');
// const weatherHandler = require('./weather.js');
// const trailsHandler = require('./trails.js');
// const moviesHandler = require('./movies.js');
// const yelpHandler = require('./yelp.js');
const errorFunc = require('./handler.js');


// Route Definitions
app.get('/location', checkLocation);
// app.get('/weather', weatherHandler);
// app.get('/trails',trailsHandler);
// app.get('/movies',moviesHandler);
// app.get('/yelp',yelpHandler);

client
  .connect()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`RAGHAD server is up and running on port ${PORT}`)
    );
  })
  .catch((err) => {
    throw new Error(`startup error ${err}`);
  });
// app.use('*', errorFunc.notFoundHandler);
// app.use(errorFunc.errorHandler);
