var path = require('path');
var express = require('express');
var logger = require('morgan');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Mesures = require('./models/measures.js'); 

// Mongoose va servir de passerelle entre notre serveur Node.js et notre serveur MongoDB (modéllisateur Node.js)
var mongoose = require('mongoose');
//ici c'est le nom du module "measure" que l'on note mais il est exporté ou ?
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/measures'; //BD
//Je ne connecte à la BDD en passant en paramèttre ERROR (pour avoir son type ou l'url de la BDD)
mongoose.connect(mongoUri, function(err, res) {
  if (err) console.log('ERROR connecting to: ' + mongoUri + '. ' + err);
  else console.log ('Successfully connected to: ' + mongoUri);
});

//Revoir à quoi sert tout ça pas bien compris
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs'); // moteur template
app.set('views', path.join(__dirname, '/views')); //dossier pages
app.use(logger('dev'));
app.use(methodOverride());

app.get('/api/measures', function (req, res) {
  Mesures.find({}, function(error, data){
    if (error) throw error;
    else res.json({ 'measures': data });
  });
});

// app.post('/api/measures/new', function (req, res) {
//   console.log(req.body);
//   var newMeasures = new Measures({ 'temperature': req.body.measures.temperature, 'light': req.body.measures.light });
//   newMeasures.save(function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.sendStatus(201);
//     }
//   });
// });

//Uri afin de rendre la vue 
app.get('/', function (req, res) {
  res.render('index');
});

app.listen(port, function () {
  console.log('Example app listening on port!' + port);
});
