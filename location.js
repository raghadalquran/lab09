'use strict';

const dependances = require('./dep.js');
const errorFunc = require('./handler.js');

function checkLocation (request,response){
  const city = request.query.city;
  console.log('HI',city);
  let sqlCheck = `SELECT * FROM locations WHERE search_query = '${city}';`;
  dependances.client.query(sqlCheck)
    .then(result => {
      if(result.rows.length > 0){
        response.status(200).json(result.rows[0]);
        console.log(result.rows.length);
      } else {
        getLocation(city)
          .then(locationData => {
            let myCity = locationData.search_query;
            let format =  locationData.formatted_query;
            let lat = locationData.latitude;
            let lon = locationData.longitude;
            let safeValues = [myCity,format,lat,lon];
            let SQL = 'INSERT INTO locations (search_query,formatted_query,latitude,longitude) VALUES ($1,$2,$3,$4);';
            return dependances.client.query(SQL,safeValues)
              .then(result2 => {
                response.status(200).json(result2.rows[0]);
              })
              .catch (error => errorFunc.errorHandler(error));
          })
      }
    })
}

// Route Handlers
function getLocation(city){
  let key = process.env.GEOCODE_API_KEY;
  const url = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
  console.log('HI',url);

  return dependances.superagent.get(url)
    .then(geoData => {
      const locationData = new Location(city, geoData.body);
      console.log('HI',locationData);
      return locationData;
    })
}
function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}

module.exports = checkLocation;
