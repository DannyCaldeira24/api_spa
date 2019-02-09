'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({
    name:String,
    description:String,
    image: String,
    price: String
});

module.exports = mongoose.model('Product', ProductSchema);