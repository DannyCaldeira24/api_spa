'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Definir los routes
var product_routes = require('./routes/product');
var twiter_routes = require('./routes/twiter');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar cabeceras y cors
app.use((req, res, next) =>{
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, application/x-www-form-urlencoded');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use('/api', product_routes);
app.use('/api', twiter_routes);

module.exports = app;