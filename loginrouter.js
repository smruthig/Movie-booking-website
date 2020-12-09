var express = require("express"); 
var router = express.Router();
var fs = require('fs');
var path =require('path');
var MongoClient = require("mongodb").MongoClient;
var cookieParser = require('cookie-parser');
router.use(cookieParser());


router.post("/", function(req,res){
	res.cookie('uid',req.body['_id'].toString(),{sameSite:true,secure:true});
	console.log(res.cookie);
	res.send('Cookie sent');
});


module.exports = router;