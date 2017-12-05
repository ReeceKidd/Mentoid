var express = require('express');
var app = express();
var matchingRoutes = express.Router();
var Matching = require('../models/Matching')

// Defined get data(index or listing) route
itemRoutes.route('/').get(function (req, res) {
    Item.find(function (err, items){
      if(err){
        console.log(err);
      }
      else {
        res.json(items);
      }
    });
  });

  module.exports = matchingRoutes;