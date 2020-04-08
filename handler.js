'use strict';

let notFoundHandler = function (request, response) {
  response.status(404).send('404 NOT FOUND');
}

let errorHandler = function (error, request, response) {
  response.status(500).send(error);
}

const errorFunc = {
  notFoundHandler : notFoundHandler,
  errorHandler : errorHandler
}

module.exports = errorFunc;
