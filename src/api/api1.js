const express = require('express');

const api = express.Router();

api.get('/mystuff', (req, res) => {
  res.send('Sample response for /mystuff');
});

api.get('/all_stuff', (req, res) => {
  res.send('Sample response for /all_stuff');
});

export default api;
