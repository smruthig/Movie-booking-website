var express = require("express"); // npm install express --savevar
var router = express.Router();
var i = 0;
var MongoClient = require("mongodb").MongoClient;


router.get("/movies", function(req,res){
	MongoClient.connect('mongodb://localhost:27017',
	{useUnifiedTopology:true}, 
	function(err,client){
		if(err) throw err;
		const db = client.db('newdb'); 
		db.collection('movies').find(req.query).toArray(function(err,objs){ 
			res.send(objs)
			i++
		});
	});
});

module.exports = router;