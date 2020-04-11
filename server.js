'use strict';
const dependances = require('./dep');
const checkLocation = require('./location.js');
const weatherHandler = require('./weather.js');
const trailsHandler = require('./trails.js');
const moviesHandler = require('./movies.js');
const yelpHandler = require('./yelp.js');
const errorFunc = require('./handler.js');


// Route Definitions
dependances.app.get('/location', checkLocation);
dependances.app.get('/weather', weatherHandler);
dependances.app.get('/trails',trailsHandler);
dependances.app.get('/movies',moviesHandler);
dependances.app.get('/yelp',yelpHandler);

dependances.client
  .connect()
  .then(() => {
    dependances.app.listen(dependances.PORT, () =>
      console.log(`RAGHAD server is up and running on port ${dependances.PORT}`)
    );
  })
  .catch((err) => {
    throw new Error(`startup error ${err}`);
  });
dependances.app.use('*', errorFunc.notFoundHandler);
dependances.app.use(errorFunc.errorHandler);
