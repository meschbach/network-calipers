# Network Calipers

A tool for measuring TCP/IP application level bandwidth.

## Example Usage

If you had a client application which you wished to measure bandwidth used.  First, launch your network service.  In the case of this example, lets say we are attempting to measure the bandwidth against our local HTTP service on port 80.  Next launch the network caliper.  The caliper works as a reverse proxy for TCP/IP, so let us setup our service on the IP 127.0.0.2 on TCP port 9999 using the following command:

>$ node tcp-pipe-caliper.js --bind 127.0.0.2 --listen 9999 --host localhost --port 80

which will output:

>Bound to  127.0.0.2 : 9999  forwarding to  localhost : 80


Now, let us connect to our service using telnet:
>$ telnet 127.0.0.2 9999
>Trying 127.0.0.1...
>Connected to localhost.
>Escape character is '^]'.
>GET / HTTP/1.1
>Host: localhost
>
>HTTP/1.1 200 OK
>Server: nginx/1.1.19
>Date: Fri, 05 Apr 2013 02:29:00 GMT
>Content-Type: text/html
>Content-Length: 151
>Last-Modified: Mon, 04 Oct 2004 15:04:06 GMT
>Connection: keep-alive
>Accept-Ranges: bytes
>
>...Cut because of Markdown...

Which the caliper application will output the following when the connection is closed:
>Sent  35  bytes and recieved  367  bytes

To shutdown the caliper utilize Control-C, at which point the Caliper will output the total bandwidth used during the session:
>SIGINT received
>Sent 35 bytes / Received 367 bytes

## Installation

Clone the Git repository, then use npm to grab the require modules:
>$ npm install

### Requirements

This application is built on top of Node.JS, using NPM for pacakge management.  Both are required to run the application.

## Comments/Questions/etc

Feel free to e-mail me, visit my website @ http://meschbach.com/ for more info, etc 

## Contribution

I'm open to contriubtions, let me know what you've got!  Either in a patch or in a fork/pull.

