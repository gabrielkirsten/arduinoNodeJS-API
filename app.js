// app.js

// BASE SETUP
// =============================================================================

// Chamando os pacotes
var express = require('express');
var app     = express();
var bodyParser = require('body-parser');

// Confifuração bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // Porta da aplicação

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
    res.json({ message: '.. WELCOME TO API ..' });
});

router.route('/arduino')
  // create a bear (accessed at POST http://localhost:8080/api/bears)
  .post(function(req, res) {
    //var bear = new Bear();      // create a new instance of the Bear model
    var port = req.body.port;  // set the bears name (comes from the request)
    res.json({ message: 'Success!' + port});

  });
// more routes for our API will happen here

// REGISTRAR ROTAS -------------------------------------------------------------
// Todas as rotas terão o prefixo /WS
app.use('/API', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Server running at port " + port);
