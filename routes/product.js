'use strict'

var express = require('express');
var ProductController = require('../controllers/product');

var api = express.Router();
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/products'});

//Listar productos
api.get('/products', ProductController.getProducts);
api.post('/product', ProductController.saveProduct);
api.post('/update-product/:id', ProductController.updateProduct);
api.delete('/product/:id', ProductController.deleteProduct);
api.post('/upload-image-product/:id', [md_upload], ProductController.uploadImage);
api.get('/get-image-product/:imageFile', ProductController.getImageFile);
api.get('/product/:id', ProductController.getProduct);

module.exports = api;
