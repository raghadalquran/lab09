'use strict';

const dependances = {};

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const pg = require('pg');

dependances.superagent = require('superagent');
dependances.pg = require('pg');
dependances.app = express();
dependances.app.use(cors());
dependances.client = new pg.Client(process.env.DATABASE_URL);
dependances.PORT = process.env.PORT || 4000;

dependances.client.on('error', err =>{
  throw new Error (err);
});

module.exports = dependances;


