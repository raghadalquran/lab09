'use strict';

const errorFunc = require('./handler.js');
const dependances = require('./dep.js');


function weatherHandler(request, response) {
  let key2 = process.env.WEATHER_API_KEY;
  dependances.superagent(
    `https://api.weatherbit.io/v2.0/forecast/daily?city=${request.query.search_query}&key=${key2}`
  )
    .then((weatherRes) => {
      console.log(weatherRes);
      const weatherSummaries = weatherRes.body.data.map((day) => {
        return new Weather(day);
      });
      response.status(200).json(weatherSummaries);
    })
    .catch((err) => errorFunc.errorHandler(err, request, response));
}

function Weather(day) {
  this.forecast = day.weather.description;
  this.time = new Date(day.valid_date).toString().slice(0, 15);
}

module.exports = weatherHandler;
