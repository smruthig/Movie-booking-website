var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var MongoClient = require('mongodb').MongoClient;
var fetch = require('node-fetch');
//var cookies = require('cookies');	
/*
function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}
*/

http.createServer(function(request,response){
	if(request.method=='GET'){
		//response.writeHead(200,{'Content-type':'text/html'});
		var myurl = url.parse(request.url)
		var pathname = myurl.pathname;			
		if (pathname=='/'){						
			pathname='/login.html';
		}
		
			fs.readFile(pathname.substr(1),function(err,data){	
				if(err)
				{
					response.writeHead(404,{'Content-type':'text/html'});
					response.write("<h1>File not found</h1>");
					response.end();
				}
				else
				{
					response.writeHead(200,{'Content-type':'text/html'});
					response.write(data);
					response.end();				
				}
			})
		
		//response.end();
	}
	
	if(request.method == 'POST'){
		
		var myurl = url.parse(request.url)
		var pathname = myurl.pathname;
		var query = myurl.query;
		let body = [];
		request.on('data',(chunk)=>{
			body.push(chunk);
		})
		.on('end',()=>{
			body = Buffer.concat(body).toString()
			body = qs.parse(body);
			MongoClient.connect('mongodb://localhost:27017',	
			{useUnifiedTopology: true},
			function(err,client){
				if(err) throw err;
				const db = client.db('newdb');
				if (query == 'login')
				{
					db.collection('user').findOne(body,
						function(err, doc){
							if (err) throw err;
							if (doc!=null)
							{	
								//login correctly
								fs.readFile(pathname.substr(1),function(err,data){	
									if(err)
									{
										response.writeHead(404,{'Content-type':'text/html'});
										response.write("<h1>File not found</h1>");
										response.end();
									}
									else
									{
										response.writeHead(200,{'Content-type':'text/html'});
										response.write(data);
										response.end();
										/*
										var b = JSON.stringify(body)
										var c = 'info='+b;
										console.log(c);
										var cookies = parseCookies(request);
										console.log(cookies);
										response.writeHead(200, {
											'Set-Cookie': c,
											'Content-Type': 'text/plain'
										});
										response.end();
										*/
										fetch('http://localhost:3000/login',{
											method:'POST',
											headers:{'content-type':'application/json'},
											body:JSON.stringify(body)
										})
										.then((res)=>res.text())
										.then((res)=>console.log(res))
										.catch(()=>console.log('err'))
									}
								})
								client.close();	
							}
							else
							{
								//user doesn't exist
								fs.readFile('login_wrong.html',function(err,data){	
									if(err)
									{
										response.writeHead(404,{'Content-type':'text/html'});
										response.write("<h1>File not found</h1>");
										response.end();
									}
									else
									{
										response.writeHead(200,{'Content-type':'text/html'});
										response.write(data);
										response.end();				
									}
								})
								client.close();
							}
						}
					)
				}
				
				if (query == 'sign')
				{
					if (body['pswd'] == body['confirm'])
					{
						body2={};
						body2['uname']=body['uname'];
						body2['pswd']=body['pswd'];
						db.collection('user').findOne(body2,
						function(err, doc){
							if (err) throw err;
							if (doc!=null)
							{
								//USER ALREADY EXISTS
								fs.readFile('sign_wrong2.html',function(err,data){	
											if(err)
											{
												response.writeHead(404,{'Content-type':'text/html'});
												response.write("<h1>File not found</h1>");
												response.end();
											}
											else
											{
												response.writeHead(200,{'Content-type':'text/html'});
												response.write(data);
												response.end();				
											}
								})
								client.close();
							}
							else
							{
								//sign up correctly
								db.collection('user').insertOne(body,
								function(err){
									fs.readFile(pathname.substr(1),function(err,data){	
										if(err)
										{
											response.writeHead(404,{'Content-type':'text/html'});
											response.write("<h1>File not found</h1>");
											response.end();
										}
										else
										{
											response.writeHead(200,{'Content-type':'text/html'});
											response.write(data);
											response.end();				
										}
									})
									client.close();
									fetch('http://localhost:3000/login',{
											method:'POST',
											headers:{'content-type':'application/json'},
											body:JSON.stringify(body)
										})
										.then((res)=>res.text())
										.then((res)=>console.log(res))
										.catch(()=>console.log('err'))
								})
							}
						})
					}
					else
					{	//PSWD NOT MATCHING
						fs.readFile('sign_wrong1.html',function(err,data){	
									if(err)
									{
										response.writeHead(404,{'Content-type':'text/html'});
										response.write("<h1>File not found</h1>");
										response.end();
									}
									else
									{
										response.writeHead(200,{'Content-type':'text/html'});
										response.write(data);
										response.end();				
									}
								})
								client.close();
					}						
				}
			})
		});
	}
}).listen(8080);
console.log('Server is up and running on http://localhost:8080');