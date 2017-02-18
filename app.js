// app.js

// BASE SETUP
// =============================================================================

// Pacotes
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var SerialPort  = require("serialport");

// Confifuração bodyParser()
// que irá ober os dados via POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // Porta da aplicação
var comPort = "COM3";                       // Porta de conexão com o arduino

// ROUTES PARA API
// =============================================================================
var router = express.Router();     // get em uma instância do express Router

// middleware usado para os requests
router.use(function(req, res, next) {
    console.log('Something is happening...');
    next(); // Certificar de ir para as próximas rotas e não parar aqui
});

// TESTE (Acessado via GET http://localhost:8080/API)
router.get('/', function(req, res) {
    res.json({ message: '.. WELCOME TO ARDUINO ONLINE API ..' });
});

// ROUTE pora comandos via arduino
router.route('/arduino')
  .post(function(req, res) {
    var portArduino = req.body.port; // ler a porta requisitada via JSON

    // Abre a conexão com a port serial
    var serialport = new SerialPort(comPort);
    serialport.on('open', function(error) {
      if (error) {
         res.log('Error on write: ', error.message)
      }
      console.log('Serial Port Opend');
      serialport.on('data', function(data){
        console.log(data[0]);
      });

      res.json({ message: 'Success! Arduino Port: ' + portArduino});
    });
  });

// Outras rotas para a API deverão ser escritas aqui

// REGISTRAR ROTAS
// Todas as rotas terão o prefixo /API
app.use('/API', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Server running at port " + port);
