var express = require("express"); 
var router = express.Router();
var fs = require('fs');
var path =require('path');
var MongoClient = require("mongodb").MongoClient;


router.get("/", function(req,res){
	MongoClient.connect('mongodb://localhost:27017',
	{useUnifiedTopology:true}, 
	function(err,client){
		if(err) throw err;
		const db = client.db('newdb'); 
		db.collection('movies').findOne(req.query, function(err,obj){ 
			if (err) throw err;
			res.send(obj);
		});
	});
});

router.post("/:ind", function(req,res){
	MongoClient.connect('mongodb://localhost:27017',
	{useUnifiedTopology:true}, 
	function(err,client){
		if(err) throw err;
		const db = client.db('newdb'); 
		db.collection('movies').updateOne({index: req.params.ind}, {$set: req.body}, function(err,obj){ 
			if (err) throw err;
			res.send('Successful');
		});
	});
});

module.exports = router;