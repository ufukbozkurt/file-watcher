const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const config = require("./config.json");

const fetchQueryParams = ( url ) => {
	var params = {}
	url.slice( url.indexOf("?")+1 ).split("&").forEach( p => {
		var [key,value] = p.split("=");
		params[ key ] = value;
	});
	return params;
}

const filePath = path.join(__dirname, config.file.path);

//===================================== Greeting Clients =====================================
const clients = [];

const wss = new WebSocket.Server({ 
	port: config.port
});

wss.on('connection', (ws,req) => {
	//TODO: Add multi file watching
	var qparams = fetchQueryParams( req.url );
	
	if(qparams.file == config.file.name){
		clients.push(ws);
		console.log(`A viewer is connected. Total of ${clients.length} viewer is connected.`);
	}
	else{
		ws.send(JSON.stringify({error:"file is not on watchlist!"}));
		ws.close();
	}
		

});
//===================================== Watch File =====================================
fs.watchFile( filePath, function ( curr, prev ) {
   // on file change we can read the new xml
   fs.readFile( filePath,'utf8', function ( err, data ) {
     if ( err ) console.log( err );
     else{

     	for( var i = 0; i < clients.length; i++ ){
     		clients[i].send( JSON.stringify(data), function(err){
				if(err){
					console.log(`Error: client-${i} => ${err}`);
					clients[i].close();
					clients.splice(i,1);
					console.log(`A viewer is disconnected. Total of ${clients.length} viewer is connected.`);
					i--;
				}
			});
     	}
     	
     }
   });
 });

console.log(`Listening on ws://localhost:${config.port}/?file=${config.file.name}`);