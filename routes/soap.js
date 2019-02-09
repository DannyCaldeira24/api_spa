'use strict'

var express = require('express');

var api = express.Router();
var multipart = require('connect-multiparty');

var soap = require('soap');
var url = 'http://www.crcind.com/csp/samples/SOAP.Demo.CLS?WSDL=1';
var args = {name: 'Ahmed'};

api.get('/list', (req, res) => {

    soap.createClient(url, function(err, client) {
        client.GetListByName(args, function(err, result) {
            res.send(result);
        });
    });

});

module.exports = api;
