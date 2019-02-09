'use strict'
//modulos
var fs = require('fs');
var path = require('path');

//modelos
var Product = require('../models/product');

//acciones
function pruebas(req, res){
	res.status(200).send({
		message: 'Probando el controlador de producto'
	});
}

function saveProduct(req, res){
	var product = new Product();
	var params = req.body;

	if(params.name){
		product.name = params.name;
		product.description = params.description;
		product.price = params.price;
		product.image = 'nophoto.png';

		product.save((err,productStored) => {
			if(err){
				res.status(500).send({message: 'Error en el servidor'});
			}else{
				if(!productStored){
					res.status(404).send({message: 'No se ha guardado el producto'});
				}else{
					res.status(200).send({
						product: productStored
					});
				}
			}
		});
	}else{
		res.status(200).send({message: 'El nombre del producto es obligatorio'});
	}
}

function getProducts(req, res){
	Product.find({}).exec((err,products)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!products){
				res.status(404).send({message: 'No hay productos'});
			}else{
				res.status(200).send({products});
			}
		}
	});
}

function getProduct(req, res){
	var productId = req.params.id;
	Product.findById(productId).exec((err,product) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!product){
				res.status(404).send({message: 'El producto no existe'});
			}else{
				res.status(200).send({product});
			}
		}
	});
}

function updateProduct(req,res){
	var productId = req.params.id;
	var update = req.body;

	Product.findByIdAndUpdate(productId, update, {new:true}, (err,productUpdated) =>{
		if(err){
			res.status(500).send({
				message: 'ERROR: Algo malo ha ocurrido'
			});
		}else{
			if(!productUpdated){
				return res.status(404).send({message:'ERROR: No se logro actualizar el producto'});
			}else{
				res.status(200).send({product:productUpdated});
			}
		}
	});
}

function uploadImage(req,res){
	var productId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('/');
		var file_name = file_split[2];

		var ext_split = file_name.split('.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
			Product.findByIdAndUpdate(productId, {image:file_name}, {new:true}, (err,productUpdated) =>{
				if(err){
					res.status(500).send({
						message: 'ERROR: Algo malo ha ocurrido'
					});
				}else{
					if(!productUpdated){
						return res.status(200).send({message:'ERROR: No se logro actualizar el producto'});
					}else{
						res.status(200).send({product:productUpdated,image: file_name});
					}
				}
			});
		}else{
			fs.unlink(file_path,(err) =>{
				if(err){
					res.status(200).send({message:'Extensión no valida y el archivo no se logro borrar'});
				}else{
					res.status(200).send({message:'Extensión no valida'});
				}
			});
		}

	}else{
		res.status(200).send({message:'No se han subido archivos'});
	}
}

function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/products/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(404).send({message:'La imagen no existe'});
		}
	});
}

function deleteProduct(req,res){
	var productId = req.params.id;
	Product.findByIdAndRemove(productId,(err, productRemoved)=>{
		if(err){
			res.status(500).send({message:'Error en la petición'});
		}else{
			if(!productRemoved){
				res.status(404).send({message:'No se ha podido eliminar el producto'});
			}else{
				res.status(200).send({product:productRemoved});
			}
		}
	});
}

module.exports={
	pruebas,
	saveProduct,
	getProducts,
	getProduct,
	updateProduct,
	uploadImage,
	getImageFile,
	deleteProduct
}