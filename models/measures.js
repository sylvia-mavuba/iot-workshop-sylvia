var mongoose = require('mongoose');

var Mesures = mongoose.model('Measures', {
  temperature: Number,
  light: Number
});

module.exports = Mesures;