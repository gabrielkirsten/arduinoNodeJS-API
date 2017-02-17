// app.js

// BASE SETUP
// =============================================================================

// Chamando os pacotes
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var fs          = require('fs');

// Confifuração bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // Porta da aplicação
var comPort = "COM1";

// ROUTES PARA API
// =============================================================================
var router = express.Router();     // get em uma instância do express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// TEST (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: '.. WELCOME TO ARDUINO ONLINE API ..' });
});

router.route('/arduino')
  .post(function(req, res) {
    var portArduino = req.body.port;  // set the bears name (comes from the request)
    fs.writeFile(comPort, portArduino, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);
    });
    res.json({ message: 'Success! port: ' + portArduino});
  });
// more routes for our API will happen here

// REGISTRAR ROTAS
// Todas as rotas terão o prefixo /API
app.use('/API', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Server running at port " + port);
