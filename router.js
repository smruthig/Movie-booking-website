var express = require("express"); // npm install express --save
var app = express();
var cors = require('cors');
app.use(cors());
var path = require('path');
//const session = require('express-session')
var MongoClient = require("mongodb").MongoClient;
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
app.use(upload.array())
app.use(bodyParser.json());
var cookie;
var movie;
var newmovie;
//cannot set cookie using cookie parser across domain

app.get("/jquery-3.5.1.js", function(req, res){
	console.log("sending jq")
	res.sendFile(path.join(__dirname+'/jquery-3.5.1.js'));
})

app.use('/login', function(req,res){
	cookie = {'uname':req.body['uname'], 'pswd':req.body['pswd']};
	res.send('Cookie set');
})


var homerouter = require("./homerouter.js")
app.use("/home", homerouter); 

var movierouter = require("./movierouter.js")
app.use("/movies", movierouter); 


var bookingrouter = require("./bookingrouter.js")
app.use("/booking", bookingrouter);

/*
app.get("/booking", function(req,res){
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

app.post("/booking/:ind", function(req,res){
	MongoClient.connect('mongodb://localhost:27017',
	{useUnifiedTopology:true}, 
	function(err,client){
		if(err) throw err;
		const db = client.db('newdb'); 
		db.collection('movies').updateOne({index: req.params.ind}, {$set: req.body}, function(err,obj){ 
			if (err) throw err;
		});
		db.collection('movies').findOne({index: req.params.ind}, function(err,obj){ 
			movie = obj;
			//res.send('Successful');

		})
	});

	MongoClient.connect('mongodb://localhost:27017',
	{useUnifiedTopology:true}, 
	function(err,client){
		if(err) throw err;
		const db = client.db('newdb'); 
		db.collection('user').findOne({uname: cookie['uname'], pswd: cookie['pswd']}, function(err,obj){ 
			if (err) throw err;
			//obj['movies'] = JSON.parse(obj['movies'])
			obj['movies'][movie['_id']]=movie;
			newmovie = obj['movies'];
			console.log('newmovie')
			console.log(newmovie)
		});
		db.collection('user').updateOne({uname: cookie['uname'], pswd: cookie['pswd']}, {$set: {'movies':newmovie}}, function(err,obj){ 
			if (err) throw err;
			res.send('Successful');
		});
	});

});
*/

app.listen(3000, function(){
	console.log("Server listening on 3000...")
});