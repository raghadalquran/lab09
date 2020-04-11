'use strict';

const dependances = require('./dep.js');

function trailsHandler(request,response){
  const lat = request.query.latitude;
  const lon = request.query.longitude;

  getTrailData(lat,lon)
    .then((trailData) =>
      response.status(200).json(trailData)
    );
}
function getTrailData(lat,lon){
  const url =`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=500&key=${process.env.TRAIL_API_KEY}`;

  return dependances.superagent.get(url)
    .then((trailData)=>{
      let trailsSummaries = trailData.body.trails.map((val)=>{
        return new Trails (val);
      });
      return trailsSummaries;
    });
}

function Trails (val){
  this.name = val.name;
  this.location = val.location;
  this.length = val.length;
  this.stars = val.stars;
  this.star_votes = val.starVotes;
  this.summary = val.summary;
  this.trail_url = val.url;
  this.conditions = val.conditionDetails;
  this.condition_date = new Date (val.conditionDate).toString().slice(3,14);
  this.condition_time = new Date (val.conditionDate).toString().slice(15,24);
}

module.exports = trailsHandler;
