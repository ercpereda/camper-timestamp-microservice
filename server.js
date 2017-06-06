"use strict";

const express = require('express');
const format = require('date-fns/format');
const parse = require('date-fns/parse');

const app = express();

app.get('/:date', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  let date = req.params['date'];
  date = parse(isNaN(date) ? date : parseInt(date) * 1000)
  let unix = format(date, 'X');
  let natural = format(date, 'MMMM DD, YYYY'); 
  
  if (unix === 'Invalid Date') {
    unix = null;
    natural = null;
  }
  
  res.json({
    unix,
    natural
  });
});

const server = app.listen(8080, () => {
  const port = server.address().port;
  console.log(`Example app listening on port ${port}!`);
});

module.exports = server;