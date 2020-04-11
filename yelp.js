'use strict';

const errorFunc = require('./handler.js');
const dependances = require('./dep.js');


function yelpHandler(request,response){
  let city = request.query.search_query;
  getyelpData(city)
    .then((yelpData)=>{
      response.status(200).json(yelpData)
    })
}
function getyelpData(city){

  const key = process.env.YELP_API_KEY;
  let url =`https://api.yelp.com/v3/businesses/search?location=${city}`;
  console.log(url);
  return dependances.superagent(url)
    .set({'Authorization':`Bearer ${key}`})
    .then(yelData =>{
      let yelpArray = yelData.body.businesses.map((value) => {
        return new Yelp(value);
      })
      console.log(yelpArray);
      return yelpArray;
    })
    .catch((err) => errorFunc.errorHandler(err));
}
function Yelp(value){
  this.name = value.name;
  this.image_url = value.image_url;
  this.price = value.price;
  this.rating= value.rating;
  this.url = value.url;
}
module.exports = yelpHandler;
