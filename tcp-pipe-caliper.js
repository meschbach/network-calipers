var network = require('net');
var optimist = require('optimist');

var configuration = optimist
	.option( 'source-host', { alias: 'bind', default: 'localhost', describe: 'the local address to bind too' } )
	.option( 'source-port', { alias: 'listen', default: 7223, describe: 'the port the client application will connect to' } )
	.option( 'sink-host', { alias: 'host', default: 'localhost', describe: 'the host to connect the remote host to' } )
	.option( 'sink-port', { alias: 'port', default: 80, describe: 'the port of the remote host to connect too' })
	.argv;

var bytesRead = 0, bytesWritten = 0;

service = network.createServer();
service.listen( configuration.listen, configuration.bind );
service.on('connection', function( client ) {
	var proxied = new network.Socket( );
	proxied.connect( configuration.port, configuration.host );

	proxied.pipe( client );
	client.pipe( proxied );

	client.on('close', function( ) {
		proxied.end();

		bytesRead += client.bytesRead;
		bytesWritten += client.bytesWritten;

		console.log( "Sent ", client.bytesRead , " bytes and recieved ", client.bytesWritten , " bytes");
	});
});
console.log( "Bound to ", configuration.bind, ":", configuration.listen, " forwarding to ", configuration.host, ":", configuration.port );

process.on( 'SIGINT', function(){
	service.close();
	console.log( "SIGINT received" );
	console.log( "Sent " + bytesRead +" bytes / Received " + bytesWritten + " bytes" );
});

